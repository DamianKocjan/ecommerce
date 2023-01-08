import { publicProcedure, router } from "../trpc";

export const colorRouter = router({
  all: publicProcedure.query(async ({ ctx }) => {
    const colors = await ctx.prisma.color.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return colors.map(({ id, name }) => ({
      key: id,
      value: name,
    }));
  }),
});
