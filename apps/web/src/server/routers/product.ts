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
			cursor: z.number().nullish(),
		}),
		async resolve({ ctx, input }) {
			const { cursor, perPage } = input;

			const where = productPaginationWithFilters(input);
			const orderBy = getOrderBy(input.sortBy);

			const items = await ctx.prisma.product.findMany({
				take: perPage + 1,
				where,
				cursor: cursor ? { id: cursor } : undefined,
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
			});

			let nextCursor: typeof cursor | undefined = undefined;
			if (items.length > perPage) {
				const nextItem = items.pop();
				nextCursor = nextItem!.id;
			}
			// TODO: get previous cursor
			let prevCursor: typeof cursor | undefined = undefined;
			if (cursor) {
				prevCursor = cursor;

				const prevItem = await ctx.prisma.product.findFirst({
					where: {
						...where,
						id: {
							lt: cursor,
						},
					},
					orderBy,
				});
				if (prevItem) {
					prevCursor = prevItem.id;
				}
			}

			return {
				items,
				nextCursor,
				prevCursor,
			};
		},
	});
