import { getServerSession } from "@ecommerce/auth";
import { Season } from "@ecommerce/db";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import { ProductDetail } from "~/components/Products/Detail";

export default ProductDetail;

interface ProductDetailProps {
	product: {
		id: number;
		slug: string;
		title: string;
		shortDescription: string;
		description: string;
		thumbnailImage: string;
		price: number;
		discount?: number | null;
		quantity: number;
		activatiedAt?: string | null;
		multipack: boolean;
		multipackQty: number;
		createdAt: string;
		updatedAt: string;
		manufacturerId: number;
		sizeId?: number | null;
		season?: Season | null;
		deliveryOptionId: string;
		colors: {
			id: number;
			name: string;
		}[];
		manufacturer: {
			id: number;
			name: string;
		};
	};
}

export async function getServerSideProps(
	context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<ProductDetailProps>> {
	const slug = context.params?.["slug"] as string;
	const product = await prisma?.product.findFirst({
		where: {
			slug,
		},
		include: {
			colors: {
				select: {
					id: true,
					name: true,
				},
			},
			manufacturer: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	});

	if (!product) {
		return {
			notFound: true,
			redirect: {
				destination: "/404",
				permanent: false,
			},
		};
	}

	const session = await getServerSession({
		req: context.req,
		res: context.res,
	});

	if (session && session.user) {
		try {
			await prisma?.view.create({
				data: {
					user: {
						connect: {
							id: session.user.id,
						},
					},
					product: {
						connect: {
							id: product.id,
						},
					},
				},
			});
		} catch (error) {
			/* empty */
		}
	}

	return {
		props: {
			product: {
				...product,
				price: product.price.toNumber(),
				discount: product.discount?.toNumber() || null,
				createdAt: product.createdAt.toISOString(),
				updatedAt: product.updatedAt.toISOString(),
				activatiedAt: product.activatiedAt?.toISOString() || null,
			},
		},
	};
}
