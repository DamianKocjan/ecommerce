import type { Prisma } from "@ecommerce/db";

import {
	productPaginationWithCategoriesFiltersSchema,
	productPaginationWithFiltersSchema,
	type ProductPaginationWithCategoriesFilters,
	type ProductPaginationWithFilters,
} from "~/schemas/filters";
import { isNumber, tryToNumber, type Arrayish, type Maybe } from "./primitives";

export async function parseFilters<T extends boolean>(
	searchParams: Record<string, string>,
	withCategoriesInFilters?: T,
): Promise<
	T extends true
		? ProductPaginationWithCategoriesFilters
		: ProductPaginationWithFilters
> {
	const filters = getFiltersFromSearchParams(searchParams);

	const result = withCategoriesInFilters
		? await productPaginationWithCategoriesFiltersSchema.parseAsync(filters)
		: await productPaginationWithFiltersSchema.parseAsync(filters);

	// NOTE: to prevent removal of the rest filters, we need to merge the filters
	return Object.assign(filters, result);
}

function getFiltersFromSearchParams(searchParams: Record<string, string>) {
	// Types of filters:
	// - [key]: [ints]
	// - [key]: [strings]
	// - [key]: int
	// - [key]: string
	// - [key]: boolean

	const filters = {} as Record<
		string | number,
		Arrayish<string | number | boolean>
	>;

	for (const [key, value] of Object.entries(searchParams)) {
		const parsedKey = tryToNumber(key);

		if (value.startsWith("[") && value.endsWith("]")) {
			const values = value.slice(1, -1).split(",");
			const allAreInts = values.every((v) => isNumber(v));

			filters[parsedKey] = allAreInts
				? values.map((v) => Number(v))
				: values.map((v) => v);
		} else if (isNumber(value)) {
			filters[parsedKey] = Number(value);
		} else if (value === "true" || value === "false") {
			filters[parsedKey] = value === "true";
		} else {
			filters[parsedKey] = value;
		}
	}

	return filters;
}

export function assembleWhereProductStatement<
	T extends ProductPaginationWithFilters,
>(
	standardFilters: T,
	restFilters: Record<string, Arrayish<number>>,
	categories: Maybe<Arrayish<string>>,
): Prisma.ProductWhereInput {
	const or = [] as Prisma.ProductWhereInput[];
	const and = [] as Prisma.ProductWhereInput[];

	if (standardFilters.q) {
		or.push({
			title: {
				contains: standardFilters.q,
				mode: "insensitive",
			},
		});
		or.push({
			shortDescription: {
				contains: standardFilters.q,
				mode: "insensitive",
			},
		});
		or.push({
			description: {
				contains: standardFilters.q,
				mode: "insensitive",
			},
		});
	}

	if (Object.entries(restFilters).length) {
		Object.entries(restFilters).forEach(([key, value]) => {
			and.push({
				skus: {
					some: {
						attributes: {
							some: {
								attribute: {
									id: Number(key),
								},
								id: {
									in: Array.isArray(value) ? value : [value],
								},
							},
						},
					},
				},
			});
		});
	}

	return {
		OR: Object.entries(or).length > 0 ? or : undefined,
		AND: Object.entries(and).length > 0 ? and : undefined,
		season:
			standardFilters.season && standardFilters.season !== "ALL"
				? {
						equals: standardFilters.season,
					}
				: undefined,
		skus: {
			some: {
				price: {
					gte: standardFilters.priceMin,
					lte: standardFilters.priceMax,
				},
			},
		},
		categories: categories
			? {
					some: {
						slug: {
							in: Array.isArray(categories) ? categories : [categories],
						},
					},
				}
			: undefined,
		manufacturer: {
			id: {
				in: standardFilters.brands,
			},
		},
		deliveryOption: {
			id: standardFilters.delivery,
		},
	};
}

export function assembleWhereWishlistProductStatement<
	T extends ProductPaginationWithFilters & { categories?: string[] },
>(
	userId: string,
	standardFilters: T,
	restFilters: Record<string, Arrayish<number>>,
): Prisma.WishlistWhereInput {
	const or = [] as Prisma.ProductWhereInput[];
	const and = [] as Prisma.ProductWhereInput[];

	if (standardFilters.q) {
		or.push({
			title: {
				contains: standardFilters.q,
				mode: "insensitive",
			},
		});
		or.push({
			shortDescription: {
				contains: standardFilters.q,
				mode: "insensitive",
			},
		});
		or.push({
			description: {
				contains: standardFilters.q,
				mode: "insensitive",
			},
		});
	}

	if (Object.entries(restFilters).length) {
		Object.entries(restFilters).forEach(([key, value]) => {
			and.push({
				skus: {
					some: {
						attributes: {
							some: {
								attribute: {
									id: Number(key),
								},
								id: {
									in: Array.isArray(value) ? value : [value],
								},
							},
						},
					},
				},
			});
		});
	}

	return {
		userId,
		product: {
			product: {
				OR: Object.entries(or).length > 0 ? or : undefined,
				AND: Object.entries(and).length > 0 ? and : undefined,
				season:
					standardFilters.season && standardFilters.season !== "ALL"
						? {
								equals: standardFilters.season,
							}
						: undefined,
				skus: {
					some: {
						price: {
							gte: standardFilters.priceMin,
							lte: standardFilters.priceMax,
						},
					},
				},
				manufacturer: {
					id: {
						in: standardFilters.brands,
					},
				},
				categories: {
					some: {
						slug: {
							in: standardFilters.categories,
						},
					},
				},
				deliveryOption: {
					id: standardFilters.delivery,
				},
			},
		},
	};
}

export function getOrderBy(
	orderBy?: string | null,
): Arrayish<Prisma.ProductOrderByWithRelationInput> | undefined {
	switch (orderBy) {
		case "popularity":
			return {};
		case "priceLowToHigh":
			return {
				// price: "asc",
			};
		case "priceHighToLow":
			return {
				// price: "desc",
			};
		case "sales":
			return {
				// discount: {
				// 	sort: "desc",
				// 	nulls: "last",
				// },
			};
		default:
			return;
	}
}

export type RestFilters = Record<
	number | string,
	Arrayish<number | string | boolean>
>;

export function getRestFilters(
	standardFilters: ProductPaginationWithFilters,
	filters: RestFilters,
) {
	return (
		Object.entries(filters)
			.map(([key]) => {
				if (Object.hasOwn(standardFilters, key) || !isNumber(key)) {
					return;
				} else if (!isNumber(filters[key]! as string)) {
					return;
				}
				return [key, filters[key]];
			})
			.filter(Boolean) as [string, Arrayish<number>][]
	).reduce(
		(acc, [key, value]) => {
			acc[key] = value;
			return acc;
		},
		{} as Record<string, Arrayish<number>>,
	);
}
