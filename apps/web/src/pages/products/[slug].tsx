import { ProductDetail } from "@/components/Products/Detail";
import { convertDecimalToNumber } from "@/utils/converters";
import { prisma } from "@ecommerce/prisma";
import type { GetStaticPaths, GetStaticProps } from "next";

export default ProductDetail;

export const getStaticProps: GetStaticProps = async (context) => {
	const slug = context.params?.["slug"] as string;
	let product = await prisma.product.findFirst({
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

	return {
		props: {
			product: convertDecimalToNumber(product),
		},
		notFound: !product,
	};
};

export const getStaticPaths: GetStaticPaths = async (_context) => {
	const products = await prisma.product.findMany({
		select: {
			slug: true,
		},
		where: {
			activatiedAt: {
				// TODO: check if this is correct
				lte: new Date(),
			},
		},
	});

	return {
		paths: products?.map((product) => ({
			params: {
				slug: product.slug,
			},
		})),
		fallback: false,
	};
};
