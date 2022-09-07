import { createRouter } from "../createRouter";

export const collectionRouter = createRouter().query("collections", {
	async resolve({ ctx }) {
		const collections = await ctx.prisma.collection.findMany({
			select: {
				id: true,
				name: true,
			},
		});

		return (collections || []).map(({ id, name }) => ({
			key: id,
			value: name,
		}));
	},
});
