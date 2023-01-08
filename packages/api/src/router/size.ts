import { z } from "zod";

import { publicProcedure, router } from "../trpc";

export const sizeRouter = router({
	all: publicProcedure
		.input(
			z.object({
				category: z.string().optional(),
			}),
		)
		.query(async ({ ctx, input }) => {
			interface Size {
				id: number;
				name: string;
			}

			let sizes: Size[] = await ctx.prisma.size.findMany({
				where: {
					forCategories: input.category
						? {
								some: {
									slug: input.category,
								},
						  }
						: undefined,
				},
				select: {
					id: true,
					name: true,
				},
			});
			if (sizes.length === 0) {
				sizes = await ctx.prisma.size.findMany({
					select: {
						id: true,
						name: true,
					},
				});
			}

			return sizes.map(({ id, name }) => ({
				key: id,
				value: name,
			}));
		}),
});
