import { type Prisma } from "@ecommerce/prisma";
import { z } from "zod";
import { createRouter } from "../createRouter";

export const categoryRouter = createRouter().query("categories", {
	input: z.object({
		category: z.string().nullish(),
		parentCategory: z.string().nullish(),
	}),
	async resolve({ ctx, input }) {
		const select: Prisma.CategorySelect = {
			name: true,
			slug: true,
		};

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
			select,
		});

		const category = input.category
			? await ctx.prisma.category.findFirst({
					where: {
						slug: input.category,
					},
					select,
			  })
			: null;

		const parentCategory = input.parentCategory
			? await ctx.prisma.category.findFirst({
					where: {
						slug: input.parentCategory,
					},
					select,
			  })
			: null;

		return {
			categories,
			category,
			parentCategory,
		};
	},
});
