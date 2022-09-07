import { createRouter } from "../createRouter";

export const patternRouter = createRouter().query("patterns", {
	async resolve({ ctx }) {
		const patterns = await ctx.prisma.pattern.findMany({
			select: {
				id: true,
				name: true,
			},
		});

		return (patterns || []).map(({ id, name }) => ({
			key: id,
			value: name,
		}));
	},
});
