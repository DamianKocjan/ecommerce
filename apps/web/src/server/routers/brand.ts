import { createRouter } from "../createRouter";

export const brandRouter = createRouter().query("brands", {
	async resolve({ ctx }) {
		const brands = await ctx.prisma.manufacturer.findMany({
			select: {
				id: true,
				name: true,
			},
		});

		return brands.map(({ id, name }) => ({
			key: id,
			value: name,
		}));
	},
});
