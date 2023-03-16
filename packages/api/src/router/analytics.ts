import { fetchAnalytics } from "../analytics/fetch";
import { assertIsAdmin } from "../helpers/auth";
import { protectedProcedure, router } from "../trpc";

export const analyticsRouter = router({
	fetch: protectedProcedure.query(async ({ ctx }) => {
		assertIsAdmin(ctx.session.user);

		const analytics = await fetchAnalytics();
		const totalProducts = await ctx.prisma.product.count();
		const totalUsers = await ctx.prisma.user.count();
		const totalProfit =
			(
				await ctx.prisma.order.aggregate({
					_sum: {
						total: true,
					},
				})
			)._sum.total?.toNumber() ?? 0;
		const totalProfitToday =
			(
				await ctx.prisma.order.aggregate({
					_sum: {
						total: true,
					},
					where: {
						createdAt: {
							gte: new Date(new Date().setHours(0, 0, 0, 0)),
						},
					},
				})
			)._sum.total?.toNumber() ?? 0;

		return {
			...analytics,
			totalProducts,
			totalUsers,
			totalProfit,
			totalProfitToday,
		};
	}),
});
