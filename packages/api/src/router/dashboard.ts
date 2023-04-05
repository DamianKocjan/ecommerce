import type { Prisma, PrismaClient } from "@ecommerce/db";
import { z } from "zod";

import { fetchAnalytics } from "../analytics/fetch";
import { assertIsAdmin } from "../helpers/auth";
import { getPreviousPage } from "../helpers/pagination";
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
	products: protectedProcedure
		.input(
			z.object({
				q: z.string().optional(),
				perPage: z.number().min(1),
				page: z.number().optional().default(0),
			}),
		)
		.query(async ({ ctx, input }) => {
			const { page, perPage, q } = input;

			const where = q
				? ({
						OR: [
							{
								title: {
									contains: q,
									mode: "insensitive",
								},
							},
							{
								shortDescription: {
									contains: q,
									mode: "insensitive",
								},
							},
							{
								description: {
									contains: q,
									mode: "insensitive",
								},
							},
						],
				  } satisfies Prisma.ProductWhereInput)
				: undefined;

			const skip = page > 0 ? perPage * (page - 1) : 0;
			const [total, data] = await ctx.prisma.$transaction([
				ctx.prisma.product.count({
					where,
				}),
				ctx.prisma.product.findMany({
					where,
					skip,
					take: perPage,
					orderBy: {
						createdAt: "desc",
					},
					select: {
						id: true,
						slug: true,
						title: true,
						price: true,
						discount: true,
						manufacturer: {
							select: {
								id: true,
								name: true,
							},
						},
						quantity: true,
					},
				}),
			]);

			const lastPage = Math.ceil(total / perPage);

			return {
				results: data.map((item) => ({
					...item,
					price: item.price.toNumber(),
					discount: item.discount?.toNumber(),
				})),
				meta: {
					total,
					lastPage,
					currentPage: page,
					perPage,
					prev: getPreviousPage({ page, lastPage }),
					next: page < lastPage ? page + 1 : undefined,
				},
			};
		}),
	productSearch: protectedProcedure
		.input(z.string())
		.query(async ({ ctx, input }) => {
			const products = await ctx.prisma.product.findMany({
				where: {
					OR: [
						{
							title: {
								contains: input,
								mode: "insensitive",
							},
						},
						{
							shortDescription: {
								contains: input,
								mode: "insensitive",
							},
						},
						{
							description: {
								contains: input,
								mode: "insensitive",
							},
						},
					],
				},
				take: 5,
				select: {
					id: true,
					title: true,
					slug: true,
				},
			});

			return products;
		}),
});
