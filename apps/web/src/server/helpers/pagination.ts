import { Prisma, Season } from "@ecommerce/prisma";
import { z } from "zod";

export function getOrderBy(
	orderBy?: string | null
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
			return;
		default:
			return;
	}
}

export const productPaginationWithFiltersSchema = {
	q: z.string().nullish(),
	sortBy: z.string().nullish(),
	sizes: z.array(z.number()).nullish(),
	brands: z.array(z.number()).nullish(),
	colors: z.array(z.number()).nullish(),
	priceMin: z.number().nullish(),
	priceMax: z.number().nullish(),
	onSaleRequired: z.boolean().nullish(),
	materials: z.array(z.number()).nullish(),
	multipack: z.boolean().nullish(),
	patterns: z.array(z.number()).nullish(),
	cuts: z.array(z.number()).nullish(),
	collectionType: z.number().nullish(),
	season: z.nativeEnum(Season).nullish(),
	delivery: z.boolean().nullish(),
	perPage: z.number(),
	page: z.number().nullish(),
};

const obj = z.object(productPaginationWithFiltersSchema);

export function productPaginationWithFilters<T extends z.infer<typeof obj>>(
	input: T
): Prisma.ProductWhereInput {
	return {
		title: input.q
			? {
					contains: input.q,
					mode: "insensitive",
			  }
			: undefined,
		size: input.sizes
			? {
					is: {
						id: {
							in: input.sizes,
						},
					},
			  }
			: undefined,
		manufacturer: input.brands
			? {
					is: {
						id: {
							in: input.brands,
						},
					},
			  }
			: undefined,
		colors: input.colors
			? {
					some: {
						id: {
							in: input.colors,
						},
					},
			  }
			: undefined,
		materials: input.materials
			? {
					some: {
						id: {
							in: input.materials,
						},
					},
			  }
			: undefined,
		multipack: input.multipack || undefined,
		patterns: input.patterns
			? {
					some: {
						id: {
							in: input.patterns,
						},
					},
			  }
			: undefined,
		cuts: input.cuts
			? {
					some: {
						id: {
							in: input.cuts,
						},
					},
			  }
			: undefined,
		collections: input.collectionType
			? {
					some: {
						id: {
							in: input.collectionType,
						},
					},
			  }
			: undefined,
		season:
			input.season && input.season !== "ALL"
				? {
						equals: input.season,
				  }
				: undefined,
	};
}
