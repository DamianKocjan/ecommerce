import { ProductDetail } from "@/components/Products/Detail";
import { makeSerializable } from "@/utils/makeSerializable";
import { prisma } from "@ecommerce/prisma";
import type { GetStaticPaths, GetStaticProps } from "next";

export default ProductDetail;

export const getStaticProps: GetStaticProps = async (context) => {
	const slug = context.params?.["slug"] as string;
	const product = await prisma.product.findFirst({
		where: {
			slug,
		},
		select: {
			id: true,
			slug: true,
			title: true,
			description: true,
			price: true,
			discount: true,
			manufacturer: {
				select: {
					id: true,
					name: true,
				},
			},
			colors: {
				select: {
					name: true,
				},
			},
		},
	});

	return {
		props: {
			product: product ? makeSerializable(product) : null,
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
