import { z } from "zod";
import { createRouter } from "../createRouter";
import { PRODUCTS_PER_PAGE } from "../helpers/constants";
import {
	getOrderBy,
	productPaginationWithFilters,
	productPaginationWithFiltersSchema,
} from "../helpers/pagination";

export const productRouter = createRouter()
	.query("products", {
		input: z.object({
			category: z.string().nullish(),
			q: z.string().nullish(),
		}),
		async resolve({ ctx, input }) {
			return await ctx.prisma.product.findMany({
				where: {
					categories: input.category
						? {
								some: {
									slug: input.category,
								},
						  }
						: undefined,
					title: {
						contains: input.q || undefined,
					},
					activatiedAt: {
						lte: new Date(),
					},
				},
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
			});
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
	})
	.query("inifityProducts", {
		input: z.object({
			...productPaginationWithFiltersSchema,
			page: z.number().nullish(),
		}),
		async resolve({ ctx, input }) {
			let { page, perPage } = input;

			if (!page) {
				page = PRODUCTS_PER_PAGE;
			}

			const where = productPaginationWithFilters(input);
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
	});
