import { z } from "zod";
import { createRouter } from "../createRouter";

export const sizeRouter = createRouter().query("sizes", {
	input: z.object({
		category: z.string().nullish(),
	}),
	async resolve({ ctx, input }) {
		let sizes = await ctx.prisma.size.findMany({
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

		return (sizes || []).map(({ id, name }) => ({
			key: id.toString(),
			value: name,
		}));
	},
});
