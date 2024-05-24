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

export const productPaginationWithFiltersSchema = {
	q: z.string().optional(),
	sortBy: z.string().optional(),
	brands: z.array(z.number()).optional(),
	priceMin: z.number().optional(),
	priceMax: z.number().optional(),
	onSaleRequired: z.boolean().optional(),
	multipack: z.boolean().optional(),
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
