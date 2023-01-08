import { publicProcedure, router } from "../trpc";

export const collectionRouter = router({
  all: publicProcedure.query(async ({ ctx }) => {
    const collections = await ctx.prisma.collection.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return collections.map(({ id, name }) => ({
      key: id,
      value: name,
    }));
  }),
});
