import { publicProcedure, router } from "../trpc";

export const patternRouter = router({
  all: publicProcedure.query(async ({ ctx }) => {
    const patterns = await ctx.prisma.pattern.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return patterns.map(({ id, name }) => ({
      key: id,
      value: name,
    }));
  }),
});
