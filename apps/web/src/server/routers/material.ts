import { createRouter } from "../createRouter";

export const materialRouter = createRouter().query("materials", {
	async resolve({ ctx }) {
		const materials = await ctx.prisma.material.findMany({
			select: {
				id: true,
				name: true,
			},
		});

		return materials.map(({ id, name }) => ({
			key: id,
			value: name,
		}));
	},
});
