import { publicProcedure, router } from "../trpc";

export const brandRouter = router({
  all: publicProcedure.query(async ({ ctx }) => {
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
  }),
});
