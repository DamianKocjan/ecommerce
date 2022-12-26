import { ProductDetail } from "@/components/Products/Detail";
import { convertDecimalToNumber, DecimalToNumber } from "@/utils/converters";
// import { getSession } from "@ecommerce/auth";
import { prisma, Product } from "@ecommerce/prisma";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

export default ProductDetail;

interface ProductDetailProps {
	product: DecimalToNumber<
		Product & {
			colors: {
				id: number;
				name: string;
			}[];
			manufacturer: {
				id: number;
				name: string;
			};
		}
	>;
}

export const getServersideProps = async (
	context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ProductDetailProps>> => {
	const slug = context.params?.["slug"] as string;
	const product = await prisma.product.findFirst({
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

	console.log({ product });

	if (!product) {
		return {
			notFound: true,
			redirect: {
				destination: "/404",
				permanent: false,
			},
		};
	}

	// const session = await getSession({
	// 	req: context.req,
	// 	res: context.res,
	// });

	// if (session && session.user) {
	// 	try {
	// 		await prisma.view.create({
	// 			data: {
	// 				user: {
	// 					connect: {
	// 						id: session.user.id,
	// 					},
	// 				},
	// 				product: {
	// 					connect: {
	// 						id: product.id,
	// 					},
	// 				},
	// 			},
	// 		});
	// 	} catch (error) {}
	// }

	return {
		props: {
			product: convertDecimalToNumber(product),
		},
		notFound: !!product,
	};
};
