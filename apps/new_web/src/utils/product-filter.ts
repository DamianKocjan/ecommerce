import { type Prisma } from "@ecommerce/db";
import { type ProductPaginationWithFilters } from "~/schemas/filters";
import { isNumber, tryToNumber, type Arrayish } from "./primitives";

export function parseFilters(searchParams: Record<string, string>) {
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
): Prisma.ProductWhereInput {
	const or = [] as NonNullable<Prisma.ProductWhereInput["OR"]>;

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
			or.push({
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
		OR: Object.entries(or).length ? or : undefined,
		season:
			standardFilters.season && standardFilters.season !== "ALL"
				? {
						equals: standardFilters.season,
					}
				: undefined,
		price: {
			gte: standardFilters.priceMin,
			lte: standardFilters.priceMax,
		},
	};
}

export function getOrderBy(
	orderBy?: string | null,
): Prisma.Enumerable<Prisma.ProductOrderByWithRelationInput> | undefined {
	switch (orderBy) {
		case "popularity":
			return;
		case "priceLowToHigh":
			return {
				price: "asc",
			};
		case "priceHighToLow":
			return {
				price: "desc",
			};
		case "sales":
			return {
				discount: {
					sort: "desc",
					nulls: "last",
				},
			};
		default:
			return;
	}
}
