import { Prisma, Season } from "@ecommerce/db";
import { z } from "zod";

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
			return;
		default:
			return;
	}
}

export const productPaginationWithFiltersSchema = {
	q: z.string().optional(),
	sortBy: z.string().optional(),
	sizes: z.array(z.number()).optional(),
	brands: z.array(z.number()).optional(),
	colors: z.array(z.number()).optional(),
	priceMin: z.number().optional(),
	priceMax: z.number().optional(),
	onSaleRequired: z.boolean().optional(),
	materials: z.array(z.number()).optional(),
	multipack: z.boolean().optional(),
	patterns: z.array(z.number()).optional(),
	cuts: z.array(z.number()).optional(),
	collectionType: z.number().optional(),
	season: z.nativeEnum(Season).optional(),
	delivery: z.boolean().optional(),
	perPage: z.number(),
	page: z.number().optional().default(0),
};

const obj = z.object(productPaginationWithFiltersSchema);

export function productPaginationWithFilters<T extends z.infer<typeof obj>>(
	input: T,
): Prisma.ProductWhereInput {
	return {
		OR: input.q
			? [
					{
						title: {
							contains: input.q,
							mode: "insensitive",
						},
					},
					{
						shortDescription: {
							contains: input.q,
							mode: "insensitive",
						},
					},
					{
						description: {
							contains: input.q,
							mode: "insensitive",
						},
					},
			  ]
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

export function getPreviousPage({
	page,
	lastPage,
}: {
	page: number;
	lastPage: number;
}) {
	return page > 0 ? page - 1 : lastPage;
}
