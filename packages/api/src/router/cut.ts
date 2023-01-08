import { publicProcedure, router } from "../trpc";

export const cutRouter = router({
  all: publicProcedure.query(async ({ ctx }) => {
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
  }),
});
