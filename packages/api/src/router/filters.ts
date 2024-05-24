import { z } from "zod";

import {
	getOrderBy,
	productPaginationWithFilters,
	productPaginationWithFiltersSchema,
} from "../helpers/pagination";
import { publicProcedure, router } from "../trpc";

export const filtersRouter = router({
	products: publicProcedure
		.input(
			z.object({
				...productPaginationWithFiltersSchema,
				category: z.string().optional(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const { page, perPage } = input;

			const where = {
				...productPaginationWithFilters(input),
				categories: input.category
					? {
							some: {
								slug: input.category,
							},
						}
					: undefined,
			};
			const orderBy = getOrderBy(input.sortBy);

			// const d = await ctx.prisma.attribute.findMany({
			// 	where: {
			// 		category: {
			// 			slug: input.category,
			// 		},
			// 	},
			// });
			// const products = await ctx.prisma.product.findMany({
			// 	where: {
			// 		categories: {
			// 			some: {
			// 				slug: input.category,
			// 			},
			// 		},
			// 	},
			// 	select: {
			// 		// attributes: true,
			// 		// attributeValues: true,
			// 		id: true,
			// 	},
			// });

			// const f = e
			// 	.map(({ attributeValues, attributes }) => [attributeValues, attributes])
			// 	.flat(1);

			// const g = [...new Set(f.map((item) => JSON.stringify(item[0])))].map(
			// 	(t) => JSON.parse(t),
			// );
			// const h = [...new Set(f.map((item) => JSON.stringify(item[1])))].map(
			// 	(t) => JSON.parse(t),
			// );
			const [filters, prices] = await ctx.prisma.$transaction([
				ctx.prisma.attribute.findMany({
					where: {
						products: {
							some: {
								categories: {
									some: {
										slug: input.category,
									},
								},
							},
						},
					},
					select: {
						id: true,
						name: true,
						values: {
							where: {
								products: {
									some: {
										categories: {
											some: {
												slug: input.category,
											},
										},
									},
								},
							},
							select: {
								id: true,
								value: true,
								_count: {
									select: {
										products: {
											where: {
												categories: {
													some: {
														slug: input.category,
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
				ctx.prisma.product.aggregate({
					where: {
						categories: {
							some: {
								slug: input.category,
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

			return { filters, prices };
		}),
});
