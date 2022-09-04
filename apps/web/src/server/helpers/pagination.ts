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
	category: z.string().nullish(),
	q: z.string().nullish(),
	sortBy: z.string().nullish(),
	size: z.array(z.number()).nullish(),
	brand: z.array(z.number()).nullish(),
	color: z.array(z.number()).nullish(),
	price: z
		.object({
			min: z.number().nullish(),
			max: z.number().nullish(),
			onSaleRequired: z.boolean().nullish(),
		})
		.nullish(),
	material: z.array(z.number()).nullish(),
	multipack: z.boolean().nullish(),
	pattern: z.array(z.number()).nullish(),
	cut: z.array(z.number()).nullish(),
	collectionType: z.number().nullish(),
	season: z.nativeEnum(Season).nullish(),
	delivery: z.boolean().nullish(),
	perPage: z.number(),
	// cursor: z.number().nullish(),
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
		size: input.size
			? {
					is: {
						id: {
							in: input.size,
						},
					},
			  }
			: undefined,
		manufacturer: input.brand
			? {
					is: {
						id: {
							in: input.brand,
						},
					},
			  }
			: undefined,
		colors: input.color
			? {
					some: {
						id: {
							in: input.color,
						},
					},
			  }
			: undefined,
		materials: input.material
			? {
					some: {
						id: {
							in: input.material,
						},
					},
			  }
			: undefined,
		multipack: input.multipack || undefined,
		patterns: input.pattern
			? {
					some: {
						id: {
							in: input.pattern,
						},
					},
			  }
			: undefined,
		cuts: input.cut
			? {
					some: {
						id: {
							in: input.cut,
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
		categories: input.category
			? {
					some: {
						slug: input.category,
					},
			  }
			: undefined,
	};
}
