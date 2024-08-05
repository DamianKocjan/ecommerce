import type { Prisma } from "@ecommerce/db";

import type {
	ProductPaginationWithCategoriesFilters,
	ProductPaginationWithFilters,
} from "~/schemas/filters";
import { createPaginationMeta } from "~/utils/pagination";
import type { Arrayish, AsyncReturnType, Maybe } from "~/utils/primitives";
import {
	assembleWhereProductStatement,
	getOrderBy,
	getRestFilters,
	type RestFilters,
} from "~/utils/product-filter";

async function queryProducts({
	take,
	skip,
	where,
	orderBy,
	standardFilters,
}: {
	take: number;
	skip: number;
	where: Prisma.ProductWhereInput;
	orderBy: ReturnType<typeof getOrderBy>;
	standardFilters: ProductPaginationWithFilters;
}) {
	return await prisma!.$transaction([
		prisma!.product.count({ where }),
		prisma!.product.findMany({
			take,
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
}

function reshapeProducts(products: AsyncReturnType<typeof queryProducts>[1]) {
	return products.map((item) => ({
		...item,
		skus: item.skus.map((sku) => ({
			...sku,
			price: sku.price.toNumber(),
			discount: sku.discount?.toNumber(),
		})),
	}));
}

type SingleCategory = ProductPaginationWithFilters &
	RestFilters & {
		categorySlug: string;
	};
type MultipleOptionalCategories = ProductPaginationWithCategoriesFilters &
	RestFilters;

export async function getProducts({
	q,
	sortBy,
	brands,
	priceMin,
	priceMax,
	onSaleRequired,
	multiPack,
	season,
	delivery,
	perPage,
	page,
	categorySlug,
	...filters
}: SingleCategory) {
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
		page,
		perPage,
	};
	// rest filters include attributes, which are not standard filters
	const restFilters = getRestFilters(standardFilters, filters);

	const where = assembleWhereProductStatement(
		standardFilters,
		restFilters,
		categorySlug,
	);
	const orderBy = getOrderBy(filters.sortBy as string | null | undefined);

	const skip =
		standardFilters.page > 1
			? standardFilters.perPage * (standardFilters.page - 1)
			: 0;
	const [total, data] = await queryProducts({
		take: standardFilters.perPage,
		skip,
		where,
		orderBy,
		standardFilters,
	});

	return {
		data: reshapeProducts(data),
		meta: createPaginationMeta({
			total,
			page: standardFilters.page,
			perPage: standardFilters.perPage,
		}),
	};
}

export async function getProductsWithOptionalCategories({
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
}: MultipleOptionalCategories) {
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

	const where = assembleWhereProductStatement(
		standardFilters,
		restFilters,
		standardFilters.categories,
	);
	const orderBy = getOrderBy(filters.sortBy as string | null | undefined);

	const skip =
		standardFilters.page > 1
			? standardFilters.perPage * (standardFilters.page - 1)
			: 0;
	const [total, data] = await queryProducts({
		take: standardFilters.perPage,
		skip,
		where,
		orderBy,
		standardFilters,
	});

	return {
		data: reshapeProducts(data),
		meta: createPaginationMeta({
			total,
			page: standardFilters.page,
			perPage: standardFilters.perPage,
		}),
	};
}

export async function getFilters(categories: Maybe<Arrayish<string>>) {
	const categoriesQuery: Prisma.CategoryListRelationFilter | undefined =
		categories
			? {
					some: {
						slug: { in: Array.isArray(categories) ? categories : [categories] },
					},
				}
			: undefined;

	const [filters, prices, manufacturers] = await prisma!.$transaction([
		prisma!.attribute.findMany({
			where: {
				values: {
					some: {
						productVariants: {
							some: {
								product: {
									categories: categoriesQuery,
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
											categories: categoriesQuery,
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
					categories: categoriesQuery,
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
						categories: categoriesQuery,
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
								categories: categoriesQuery,
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

export async function getProduct(slug: string, sku: string) {
	const [product, rating] = await prisma!.$transaction([
		prisma!.product.findUnique({
			where: {
				slug,
				skus: {
					some: {
						sku,
					},
				},
			},
			select: {
				id: true,
				slug: true,
				title: true,
				shortDescription: true,
				description: true,
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
						stock: true,
						attributes: {
							select: {
								id: true,
								value: true,
								attribute: {
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
		prisma!.review.aggregate({
			where: {
				product: {
					slug,
				},
			},
			_avg: {
				rating: true,
			},
		}),
	]);

	if (!product) {
		return null;
	}

	return {
		...product,
		skus: product.skus.map((sku) => ({
			...sku,
			price: sku.price.toNumber(),
			discount: sku.discount?.toNumber(),
		})),
		rating: rating._avg.rating || 0,
	};
}
