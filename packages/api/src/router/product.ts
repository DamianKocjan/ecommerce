import { Prisma } from "@ecommerce/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
	getOrderBy,
	getPreviousPage,
	productPaginationWithFilters,
	productPaginationWithFiltersSchema,
} from "../helpers/pagination";
import { publicProcedure, router } from "../trpc";

export const productRouter = router({
	all: publicProcedure
		.input(
			z.object({
				...productPaginationWithFiltersSchema,
				category: z.string().optional(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const { page, perPage } = input;

			const where = {
				...productPaginationWithFilters(input),
				categories: input.category
					? {
							some: {
								slug: input.category,
							},
					  }
					: undefined,
			};
			const orderBy = getOrderBy(input.sortBy);

			const skip = page > 0 ? perPage * (page - 1) : 0;
			const [total, data] = await ctx.prisma.$transaction([
				ctx.prisma.product.count({ where }),
				ctx.prisma.product.findMany({
					take: perPage,
					skip,
					where,
					orderBy,
					include: {
						manufacturer: true,
						categories: true,
						attributeValues: true,
						deliveryOption: true,
						skus: {
							include: {
								attributes: true,
								images: true,
							},
						},
					},
				}),
			]);
			const lastPage = Math.ceil(total / perPage);

			return {
				data: data.map((item) => ({
					...item,
					price: item.price.toNumber(),
					discount: item.discount?.toNumber() || null,
					skus: item.skus.map((sku) => ({
						...sku,
						price: sku.price?.toNumber() || null,
						discount: sku.discount?.toNumber() || null,
					})),
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
	get: publicProcedure
		.input(
			z.object({
				slug: z.string(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const data = await ctx.prisma.product.findFirst({
				where: {
					slug: input.slug,
					activatedAt: {
						lte: new Date(),
					},
				},
			});

			if (!data) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Product not found",
				});
			}
			return {
				...data,
				price: data.price.toNumber(),
				discount: data.discount?.toNumber(),
				createdAt: data.createdAt.toISOString(),
				updatedAt: data.updatedAt.toISOString(),
				details: [] as {
					name: string;
					items: string[];
				}[],
				images: [] as {
					id: string;
					src: string;
					alt: string;
				}[],
			};
		}),
	bag: publicProcedure
		.input(
			z.object({
				products: z.array(z.string()),
			}),
		)
		.query(async ({ ctx, input }) => {
			const data = await ctx.prisma.product.findMany({
				where: {
					slug: {
						in: input.products,
					},
				},
				select: {
					id: true,
					slug: true,
					title: true,
					skus: {
						select: {
							thumbnailImage: true,
							multiPack: true,
							multiPackQuantity: true,
							attributes: true,
						},
					},
					price: true,
				},
			});

			return data.map((item) => ({
				...item,
				price: item.price.toNumber(),
			}));
		}),
	new: publicProcedure
		.input(
			z.object({
				perPage: z.number(),
				page: z.number().optional().default(0),
			}),
		)
		.query(async ({ ctx, input }) => {
			const { page, perPage } = input;

			const where: Prisma.ProductWhereInput = {
				activatedAt: {
					lte: new Date(),
				},
				categories: {
					some: {
						name: {
							contains: "new",
							mode: "insensitive",
						},
					},
				},
			};

			const skip = page > 0 ? perPage * (page - 1) : 0;
			const [total, data] = await ctx.prisma.$transaction([
				ctx.prisma.product.count({ where }),
				ctx.prisma.product.findMany({
					take: perPage,
					skip,
					where: {},
					orderBy: {
						activatedAt: "desc",
					},
					select: {
						id: true,
						slug: true,
						title: true,
						description: true,
						skus: {
							select: {
								id: true,
								thumbnailImage: true,
								images: {
									select: {
										url: true,
									},
								},
								price: true,
								discount: true,
							},
						},
						price: true,
						discount: true,
						manufacturer: {
							select: {
								id: true,
								name: true,
							},
						},
					},
				}),
			]);
			const lastPage = Math.ceil(total / perPage);

			return {
				data: data.map((item) => ({
					...item,
					price: item.price.toNumber(),
					discount: item.discount?.toNumber(),
				})),
				meta: {
					total,
					lastPage,
					currentPage: page,
					perPage,
					prev: page > 1 ? page - 1 : undefined,
					next: page < lastPage ? page + 1 : undefined,
				},
			};
		}),
});
