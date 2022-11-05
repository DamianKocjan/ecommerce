import { z } from "zod";
import { createRouter } from "../createRouter";

export const categoryRouter = createRouter()
	.query("categories", {
		input: z.object({
			category: z.string().nullish(),
			parentCategory: z.string().nullish(),
		}),
		async resolve({ ctx, input }) {
			const categories = await ctx.prisma.category.findMany({
				where: input.category
					? {
							parentCategory: {
								slug: input.category,
							},
					  }
					: {
							parentCategoryId: null,
					  },
				select: {
					name: true,
					slug: true,
				},
			});

			const category = input.category
				? await ctx.prisma.category.findFirst({
						where: {
							slug: input.category,
						},
						select: {
							name: true,
							slug: true,
						},
				  })
				: null;

			const parentCategory = input.parentCategory
				? await ctx.prisma.category.findFirst({
						where: {
							slug: input.parentCategory,
						},
						select: {
							name: true,
							slug: true,
						},
				  })
				: null;

			return {
				categories,
				category,
				parentCategory,
			};
		},
	})
	.query("navCategories", {
		async resolve({ ctx }) {
			const categories = await ctx.prisma.category.findMany({
				where: {
					parentCategoryId: null,
				},
				select: {
					name: true,
					slug: true,
					subcategories: {
						select: {
							name: true,
							slug: true,
						},
					},
				},
			});

			return {
				categories,
			};
		},
	});
