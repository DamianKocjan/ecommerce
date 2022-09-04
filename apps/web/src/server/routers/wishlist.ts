import * as trpc from "@trpc/server";
import { z } from "zod";
import { createProtectedRouter } from "../createProtectedRouter";
import {
	getOrderBy,
	productPaginationWithFilters,
	productPaginationWithFiltersSchema,
} from "../helpers/pagination";

export const wishlistRouter = createProtectedRouter()
	.query("isInWishlist", {
		input: z.object({
			productId: z.number(),
		}),
		async resolve({ ctx, input }) {
			const wishlist = await ctx.prisma.wishlist.findFirst({
				where: {
					productId: input.productId,
					userId: ctx.session?.userId,
				},
			});
			return wishlist?.id ?? null;
		},
	})
	.mutation("addToWishlist", {
		input: z.object({
			productId: z.number(),
		}),
		async resolve({ ctx, input }) {
			const wishlist = await ctx.prisma.wishlist.create({
				data: {
					user: {
						connect: {
							id: ctx.session?.userId,
						},
					},
					product: {
						connect: {
							id: input.productId,
						},
					},
				},
			});
			return wishlist.id;
		},
	})
	.mutation("removeFromWishlist", {
		input: z.object({
			id: z.string(),
		}),
		async resolve({ ctx, input }) {
			const wishlist = await ctx.prisma.wishlist.findFirst({
				where: {
					id: input.id,
				},
			});

			if (!wishlist) {
				throw new trpc.TRPCError({ code: "NOT_FOUND" });
			} else if (wishlist.userId !== ctx.session?.userId) {
				throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
			}

			await ctx.prisma.wishlist.delete({
				where: {
					id: input.id,
				},
			});
		},
	})
	.query("wishlistedProducts", {
		input: z.object({
			...productPaginationWithFiltersSchema,
			cursor: z.string().nullish(),
		}),
		async resolve({ ctx, input }) {
			const { cursor, perPage } = input;

			const now = new Date();
			const where = {
				product: {
					...productPaginationWithFilters(input),
					activatiedAt: {
						lte: now,
					},
				},
				userId: ctx.session?.userId,
			};
			const orderBy = getOrderBy(input.sortBy);

			const items = await ctx.prisma.wishlist.findMany({
				where,
				orderBy,
				cursor: cursor ? { id: cursor } : undefined,
				take: perPage + 1,
				select: {
					id: true,
					product: {
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
					},
				},
			});

			let nextCursor: typeof cursor | undefined = undefined;
			if (items.length > perPage) {
				const nextItem = items.pop();
				nextCursor = nextItem!.id;
			}
			// TODO: calculate previus cursor
			let prevCursor: typeof cursor | undefined = undefined;
			if (cursor) {
				prevCursor = cursor;

				const prevItem = await ctx.prisma.wishlist.findFirst({
					where: {
						...where,
						id: {
							lt: cursor,
						},
					},
					orderBy,
					select: {
						id: true,
					},
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
