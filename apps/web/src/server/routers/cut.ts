import { createRouter } from "../createRouter";

export const cutRouter = createRouter().query("cuts", {
	async resolve({ ctx }) {
		const cuts = await ctx.prisma.cut.findMany({
			select: {
				id: true,
				name: true,
			},
		});

		return cuts.map(({ id, name }) => ({
			key: id,
			value: name,
		}));
	},
});
