import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const categoryRouter = router({
  all: publicProcedure
    .input(
      z.object({
        category: z.string().optional(),
        parentCategory: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const categories = await ctx.prisma.category.findMany({
        where: input.category
          ? {
              parentCategory: {
                slug: input.category,
              },
            }
          : {
              parentCategoryId: null,
            },
        select: {
          name: true,
          slug: true,
        },
      });

      const category = input.category
        ? await ctx.prisma.category.findFirst({
            where: {
              slug: input.category,
            },
            select: {
              name: true,
              slug: true,
            },
          })
        : null;

      const parentCategory = input.parentCategory
        ? await ctx.prisma.category.findFirst({
            where: {
              slug: input.parentCategory,
            },
            select: {
              name: true,
              slug: true,
            },
          })
        : null;

      return {
        categories,
        category,
        parentCategory,
      };
    }),
});
