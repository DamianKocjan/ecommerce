import { createRouter } from "../createRouter";

export const colorRouter = createRouter().query("colors", {
	async resolve({ ctx }) {
		const colors = await ctx.prisma.color.findMany({
			select: {
				id: true,
				name: true,
			},
		});

		return (colors || []).map(({ id, name }) => ({
			key: id,
			value: name,
		}));
	},
});
