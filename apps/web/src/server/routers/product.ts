import { z } from "zod";
import { createRouter } from "../createRouter";
import {
	getOrderBy,
	productPaginationWithFilters,
	productPaginationWithFiltersSchema,
} from "../helpers/pagination";

export const productRouter = createRouter()
	.query("products", {
		input: z.object({
			...productPaginationWithFiltersSchema,
			category: z.string().nullish(),
		}),
		async resolve({ ctx, input }) {
			let { page, perPage } = input;

			if (!page) {
				page = 0;
			}

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

			const skip = page > 0 ? perPage * (page - 1) : 0;
			const [total, data] = await Promise.all([
				ctx.prisma.product.count({ where }),
				ctx.prisma.product.findMany({
					take: perPage,
					skip,
					where,
					orderBy,
					select: {
						id: true,
						slug: true,
						title: true,
						description: true,
						price: true,
						discount: true,
						manufacturer: {
							select: {
								id: true,
								name: true,
							},
						},
					},
				}),
			]);
			const lastPage = Math.ceil(total / perPage);

			return {
				data,
				meta: {
					total,
					lastPage,
					currentPage: page,
					perPage,
					prev: page > 1 ? page - 1 : null,
					next: page < lastPage ? page + 1 : null,
				},
			};
		},
	})
	.query("product", {
		input: z.object({
			slug: z.string(),
		}),
		async resolve({ ctx, input }) {
			return await ctx.prisma.product.findFirstOrThrow({
				where: {
					slug: input.slug,
					activatiedAt: {
						lte: new Date(),
					},
				},
			});
		},
	});
