import type { Prisma } from "@ecommerce/db";

import { type ProductPaginationWithCategoriesFilters } from "~/schemas/filters";
import { createPaginationMeta } from "~/utils/pagination";
import {
	assembleWhereWishlistProductStatement,
	getOrderBy,
	getRestFilters,
	type RestFilters,
} from "~/utils/product-filter";

export async function getWishlistedProducts({
	userId,
	q,
	sortBy,
	brands,
	priceMin,
	priceMax,
	onSaleRequired,
	multiPack,
	season,
	delivery,
	categories,
	perPage,
	page,
	...filters
}: {
	userId: string;
} & ProductPaginationWithCategoriesFilters &
	RestFilters) {
	const standardFilters = {
		q,
		sortBy,
		brands,
		priceMin,
		priceMax,
		onSaleRequired,
		multiPack,
		season,
		delivery,
		categories,
		page,
		perPage,
	};
	// rest filters include attributes, which are not standard filters
	const restFilters = getRestFilters(standardFilters, filters);

	const where = assembleWhereWishlistProductStatement(
		userId,
		standardFilters,
		restFilters,
	);
	const orderBy = getOrderBy(filters.sortBy as string | null | undefined);

	const skip = page > 0 ? perPage * (page - 1) : 0;
	const [total, data] = await prisma!.$transaction([
		prisma!.wishlist.count({
			where,
		}),
		prisma!.wishlist.findMany({
			take: perPage,
			skip,
			where,
			orderBy: {
				product: {
					...orderBy,
				} as Prisma.ProductOrderByWithRelationInput,
			},
			select: {
				id: true,
				product: {
					select: {
						id: true,
						sku: true,
						thumbnailImage: true,
						images: {
							select: {
								url: true,
							},
						},
						price: true,
						discount: true,
						product: {
							select: {
								id: true,
								slug: true,
								title: true,
								manufacturer: {
									select: {
										id: true,
										name: true,
									},
								},
							},
						},
					},
				},
			},
		}),
	]);

	return {
		data: data.map((item) => ({
			...item,
			product: {
				...item.product.product,
				skus: [
					{
						...item.product,
						price: item.product.price.toNumber(),
						discount: item.product.discount?.toNumber(),
					},
				],
			},
		})),
		meta: createPaginationMeta({ total, page, perPage }),
	};
}

export async function getWishlistFilters(userId?: string) {
	const [filters, prices, manufacturers] = await prisma!.$transaction([
		prisma!.attribute.findMany({
			where: {
				values: {
					some: {
						productVariants: {
							some: {
								wishlist: {
									some: {
										userId,
									},
								},
							},
						},
					},
				},
			},
			select: {
				id: true,
				name: true,
				values: {
					select: {
						id: true,
						value: true,
						_count: {
							select: {
								productVariants: {
									where: {
										wishlist: {
											some: {
												userId,
											},
										},
									},
								},
							},
						},
					},
				},
			},
		}),
		prisma!.productVariant.aggregate({
			where: {
				wishlist: {
					some: {
						userId,
					},
				},
			},
			_min: {
				price: true,
			},
			_max: {
				price: true,
			},
		}),
		prisma!.manufacturer.findMany({
			where: {
				products: {
					some: {
						skus: {
							some: {
								wishlist: {
									some: {
										userId,
									},
								},
							},
						},
					},
				},
			},
			select: {
				id: true,
				name: true,
				_count: {
					select: {
						products: {
							where: {
								skus: {
									some: {
										wishlist: {
											some: {
												userId,
											},
										},
									},
								},
							},
						},
					},
				},
			},
		}),
	]);

	return {
		filters,
		prices: {
			min: prices._min.price?.toNumber(),
			max: prices._max.price?.toNumber(),
		},
		manufacturers,
	};
}
