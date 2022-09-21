import { type Prisma } from "@ecommerce/prisma";
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
					userId: ctx.session.user?.id,
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
							id: ctx.session.user?.id,
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
			} else if (wishlist.userId !== ctx.session.user?.id) {
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
		input: z.object(productPaginationWithFiltersSchema),
		async resolve({ ctx, input }) {
			let { page, perPage } = input;

			if (!page) {
				page = 0;
			}

			const where = {
				product: productPaginationWithFilters(input),
				userId: ctx.session.user?.id,
			};
			const orderBy = getOrderBy(input.sortBy);

			const skip = page > 0 ? perPage * (page - 1) : 0;
			const [total, data] = await Promise.all([
				ctx.prisma.wishlist.count({ where }),
				ctx.prisma.wishlist.findMany({
					take: perPage,
					skip,
					where,
					orderBy: {
						product: {
							...orderBy,
						} as Prisma.ProductOrderByWithRelationInput,
					},
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
