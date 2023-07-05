import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure, publicProcedure, router } from "../trpc";

export const reviewRouter = router({
	get: publicProcedure
		.input(
			z.object({
				slug: z.string(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const [averageRating, userReview] = await ctx.prisma.$transaction([
				ctx.prisma.review.aggregate({
					where: {
						product: {
							slug: input.slug,
						},
					},
					_avg: {
						rating: true,
					},
				}),
				ctx.prisma.review.findFirst({
					where: {
						product: {
							slug: input.slug,
						},
						userId: ctx.session?.user?.id,
					},
				}),
			]);

			return {
				averageRating: averageRating._avg.rating ?? 0,
				userReview,
			};
		}),
	rate: protectedProcedure
		.input(
			z.object({
				slug: z.string(),
				rating: z.number().min(1).max(5),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { slug, rating } = input;

			const product = await ctx.prisma.product.findUnique({
				where: {
					slug,
				},
				select: {
					id: true,
				},
			});
			if (!product) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Product not found",
				});
			}

			/*
			1. Check if user has already rated this product
			2. If yes and rating is the same as before, remove the rating
			3. If yes, update the rating
			4. If no, create a new rating
			*/
			const existingRating = await ctx.prisma.review.findFirst({
				where: {
					productId: product.id,
					userId: ctx.session.user.id,
				},
				select: {
					id: true,
					rating: true,
				},
			});

			if (existingRating) {
				if (existingRating.rating === rating) {
					await ctx.prisma.review.delete({
						where: {
							id: existingRating.id,
						},
					});
					return {
						type: "delete",
						id: existingRating.id,
					};
				}

				await ctx.prisma.review.update({
					where: {
						id: existingRating.id,
					},
					data: {
						rating,
					},
				});
				return {
					type: "update",
					id: existingRating.id,
				};
			}

			const review = await ctx.prisma.review.create({
				data: {
					rating,
					productId: product.id,
					userId: ctx.session.user.id,
				},
				select: {
					id: true,
				},
			});
			return {
				type: "create",
				id: review.id,
			};
		}),
	write: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				title: z.string(),
				comment: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { id, title, comment } = input;

			const review = await ctx.prisma.review.findUnique({
				where: {
					id,
				},
				select: {
					id: true,
				},
			});
			if (!review) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Review not found",
				});
			}

			await ctx.prisma.review.update({
				where: {
					id,
				},
				data: {
					title,
					comment,
				},
			});

			return true;
		}),
});
