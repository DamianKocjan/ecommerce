import { prisma } from "@ecommerce/db";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProduct } from "~/server/products";
import { ProductDetails } from "./product-details";
import { ProductPreview } from "./product-preview";
import { RecommendedProducts } from "./recommended-products";

type Props = {
	params: {
		slug: string;
		sku: string;
	};
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const product = await prisma.product.findFirst({
		where: {
			slug: params.slug,
			skus: {
				some: {
					sku: params.sku,
				},
			},
		},
		select: {
			title: true,
			shortDescription: true,
			skus: {
				where: {
					sku: params.sku,
				},
				select: {
					images: {
						select: {
							url: true,
						},
					},
					thumbnailImage: true,
				},
			},
		},
	});

	if (!product || !product.skus[0]) {
		return notFound();
	}

	const sku = product.skus[0];
	const image = sku.images[sku.thumbnailImage]!;

	return {
		title: product.title,
		description: product.shortDescription,
		openGraph: {
			title: product.title,
			description: product.shortDescription,
			images: [image],
			type: "profile",
			// TODO: Update URL
			// Use VERCEL_URL environment variable to get the current deployment URL
			url: `https://example.com/products/${params.slug}/${params.sku}`,
			siteName: "E-commerce Store",
		},
		twitter: {
			card: "summary_large_image",
			title: product.title,
			description: product.shortDescription,
			images: [image],
		},
	};
}

export default async function ProductDetail({ params }: Props) {
	const product = await getProduct(params.slug, params.sku);

	if (!product) {
		return notFound();
	}

	const sku = product.skus[0]!;

	return (
		<div className="container grid grid-cols-2 gap-6 pb-8 pt-6 md:py-10">
			<ProductPreview images={sku.images} thumbnailImage={sku.thumbnailImage} />
			<ProductDetails product={product} sku={params.sku} />

			<RecommendedProducts productId={product.id} />
		</div>
	);
}
