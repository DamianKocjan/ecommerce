import { NextSeo } from "next-seo";
import { useState } from "react";

import { RouterOutputs } from "../../../utils/trpc";
import { Container } from "../../shared/core/Container";
import { Grid } from "../../shared/core/Grid";
import { ProductDescription } from "./Description";
import { ImageGallery } from "./ImageGallery";
import { ProductInfo } from "./Info";
import { SimilarProducts } from "./SimilarProducts";

export interface ProductDetailProps {
	product: RouterOutputs["product"]["get"];
}

export function ProductDetail({ product }: ProductDetailProps) {
	const [selectedColor, setSelectedColor] = useState(product.colors[0]);

	if (!product) {
		return null;
	}

	product.details = [
		{
			name: "hello world",
			items: [
				"lorem ipsum dolor sit amet consectetur adipisicing elit.",
				"lorem ipsum dolor sit amet consectetur adipisicing elit.",
				"lorem ipsum dolor sit amet consectetur adipisicing elit.",
			],
		},
		{
			name: "hello world",
			items: ["lorem ipsum dolor sit amet consectetur adipisicing elit."],
		},
	];

	product.images = [
		{
			id: "1",
			src: "https://source.unsplash.com/random",
			alt: "product image",
		},
		{
			id: "2",
			src: "https://source.unsplash.com/random?query=tree",
			alt: "product image",
		},
		{
			id: "3",
			src: "https://source.unsplash.com/random?query=car",
			alt: "product image",
		},
		{
			id: "4",
			src: "https://source.unsplash.com/random?query=food",
			alt: "product image",
		},
		{
			id: "5",
			src: "https://source.unsplash.com/random?query=cosmos",
			alt: "product image",
		},
	];

	return (
		<Container title={product.title}>
			<NextSeo
				description={product.shortDescription}
				openGraph={{
					title: product.title,
					description: product.shortDescription,
					images: [
						{
							url: product.thumbnailImage,
							width: 800,
							height: 600,
							alt: product.title,
						},
					],
				}}
			/>

			<div className="py-4">
				<Grid media="lg" className="lg:grid-cols-2 lg:items-start lg:gap-x-8">
					{/* Image gallery */}
					<ImageGallery images={product?.images} />

					{/* Product info */}
					<ProductInfo
						product={product}
						selectedColor={selectedColor}
						setSelectedColor={setSelectedColor}
					/>
				</Grid>

				{/* Description */}
				<ProductDescription description={product.description} />

				{/* Similar products */}
				<SimilarProducts />
			</div>
		</Container>
	);
}
