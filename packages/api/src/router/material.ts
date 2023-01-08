import { publicProcedure, router } from "../trpc";

export const materialRouter = router({
  all: publicProcedure.query(async ({ ctx }) => {
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
  }),
});
