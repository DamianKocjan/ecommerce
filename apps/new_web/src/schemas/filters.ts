import { Season } from "@ecommerce/db";
import { z } from "zod";

export const productPaginationWithFiltersSchema = z.object({
	q: z
		.string()
		.optional()
		.catch(() => undefined),
	sortBy: z
		.string()
		.optional()
		.catch(() => undefined),
	brands: z
		.array(z.number())
		.optional()
		.catch(() => undefined),
	priceMin: z
		.number()
		.optional()
		.catch(() => undefined),
	priceMax: z
		.number()
		.optional()
		.catch(() => undefined),
	onSaleRequired: z
		.boolean()
		.optional()
		.catch(() => undefined),
	multipack: z
		.boolean()
		.optional()
		.catch(() => undefined),
	season: z
		.nativeEnum(Season)
		.optional()
		.catch(() => undefined),
	delivery: z
		.string()
		.optional()
		.catch(() => undefined),
	perPage: z.number().catch(() => 6),
	page: z
		.number()
		.optional()
		.default(1)
		.catch(() => 1),
});

export type ProductPaginationWithFilters = z.infer<
	typeof productPaginationWithFiltersSchema
>;
