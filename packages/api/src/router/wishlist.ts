import { type Prisma } from "@ecommerce/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
	getOrderBy,
	productPaginationWithFilters,
	productPaginationWithFiltersSchema,
} from "../helpers/pagination";
import { protectedProcedure, router } from "../trpc";

export const wishlistRouter = router({
	isIn: protectedProcedure
		.input(
			z.object({
				productId: z.number(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const wishlist = await ctx.prisma.wishlist.findFirst({
				where: {
					productId: input.productId,
					userId: ctx.session.user?.id,
				},
			});
			return wishlist?.id;
		}),
	add: protectedProcedure
		.input(
			z.object({
				productId: z.number(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
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
		}),
	remove: protectedProcedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const wishlist = await ctx.prisma.wishlist.findFirst({
				where: {
					id: input.id,
				},
			});

			if (!wishlist) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Wishlist not found",
				});
			} else if (wishlist.userId !== ctx.session.user?.id) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "You cannot remove someone's wishlist",
				});
			}

			await ctx.prisma.wishlist.delete({
				where: {
					id: input.id,
				},
			});
		}),
	all: protectedProcedure
		.input(z.object(productPaginationWithFiltersSchema))
		.query(async ({ ctx, input }) => {
			const { page, perPage } = input;

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
								thumbnailImage: true,
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
				data: data.map((item) => ({
					...item,
					product: {
						...item.product,
						price: item.product.price.toNumber(),
						discount: item.product.discount?.toNumber(),
					},
				})),
				meta: {
					total,
					lastPage,
					currentPage: page,
					perPage,
					prev: page > 1 ? page - 1 : undefined,
					next: page < lastPage ? page + 1 : undefined,
				},
			};
		}),
});
