import type { Prisma } from "@ecommerce/db";
import { productPaginationWithFiltersSchema } from "~/schemas/filters";
import { createPaginationMeta } from "~/utils/pagination";
import {
	assembleWhereProductStatement,
	getOrderBy,
	getRestFilters,
	type RestFilters,
} from "~/utils/product-filter";

export async function getProducts({
	page,
	perPage,
	categorySlug,
	...filters
}: {
	page: number;
	perPage: number;
	categorySlug: string;
} & RestFilters) {
	const standardFilters = await productPaginationWithFiltersSchema.parseAsync({
		q: filters.q,
		sortBy: filters.sortBy,
		brands: filters.brands,
		priceMin: filters.priceMin,
		priceMax: filters.priceMax,
		onSaleRequired: filters.onSaleRequired,
		multiPack: filters.multiPack,
		season: filters.season,
		delivery: filters.delivery,
		page,
		perPage,
	});
	// rest filters include attributes, which are not standard filters
	const restFilters = getRestFilters(standardFilters, filters);

	const where = assembleWhereProductStatement(
		categorySlug,
		standardFilters,
		restFilters,
	);
	const orderBy = getOrderBy(filters.sortBy as string | null | undefined);

	const skip = page > 1 ? perPage * (page - 1) : 0;
	const [total, data] = await prisma!.$transaction([
		prisma!.product.count({ where }),
		prisma!.product.findMany({
			take: perPage,
			skip,
			where,
			orderBy,
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
				skus: {
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
					},
					where: {
						price: {
							gte: standardFilters.priceMin,
							lte: standardFilters.priceMax,
						},
						AND: where.OR?.map((or) =>
							"skus" in or ? or.skus!.some! : undefined,
						).filter(Boolean) as Prisma.ProductVariantWhereInput[] | undefined,
					},
				},
			},
		}),
	]);

	return {
		data: data.map((item) => ({
			...item,
			skus: item.skus.map((sku) => ({
				...sku,
				price: sku.price.toNumber(),
				discount: sku.discount?.toNumber(),
			})),
		})),
		meta: createPaginationMeta({ total, page, perPage }),
	};
}

export async function getFilters(categorySlug: string) {
	const [filters, prices] = await prisma!.$transaction([
		prisma!.attribute.findMany({
			where: {
				values: {
					some: {
						productVariants: {
							some: {
								product: {
									categories: {
										some: {
											slug: categorySlug,
										},
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
										product: {
											categories: {
												some: {
													slug: categorySlug,
												},
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
				product: {
					categories: {
						some: {
							slug: categorySlug,
						},
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
	]);

	return {
		filters,
		prices: {
			min: prices._min.price?.toNumber(),
			max: prices._max.price?.toNumber(),
		},
	};
}
