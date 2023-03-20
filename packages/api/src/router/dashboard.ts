import type { PrismaClient } from "@ecommerce/db";

import { fetchAnalytics } from "../analytics/fetch";
import { assertIsAdmin } from "../helpers/auth";
import { protectedProcedure, router } from "../trpc";

type Profit = {
	date: string;
	profit: number;
};

const ONE_DAY = 24 * 60 * 60 * 1000;

/** Returns profits of each day of the week */
async function getProfitsFromEachDayWeek(prisma: PrismaClient) {
	const profits: Profit[] = [];
	const now = new Date().setHours(0, 0, 0, 0);

	for (let i = 6; i > -1; i--) {
		const date = new Date(now - (i - 1) * ONE_DAY);
		const profit = await prisma.order.aggregate({
			_sum: {
				total: true,
			},
			where: {
				createdAt: {
					gte: date,
				},
			},
		});

		profits.push({
			date: date.toISOString(),
			profit: profit._sum.total?.toNumber() ?? 0,
		});
	}
	return profits;
}

export const dashboardRouter = router({
	analytics: protectedProcedure.query(async ({ ctx }) => {
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
		const latestOrders = await ctx.prisma.order.findMany({
			take: 5,
			orderBy: {
				createdAt: "desc",
			},
			include: {
				items: {
					include: {
						product: true,
					},
				},
			},
		});

		return {
			...analytics,
			totalProducts,
			totalUsers,
			totalProfit,
			totalProfitToday,
			totalProfitWeekPerDay: await getProfitsFromEachDayWeek(ctx.prisma),
			latestOrders,
		};
	}),
});
