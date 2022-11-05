import { Container } from "@/components/shared/Container";
import { type Product } from "@ecommerce/prisma";
import { useState } from "react";
import { ProductDescription } from "./Description";
import { ImageGallery } from "./ImageGallery";
import { ProductInfo } from "./Info";
import { SimilarProducts } from "./SimilarProducts";

export interface ProductDetailProps {
	product: Product & { colors: { name: string }[] };
}

export function ProductDetail({ product }: ProductDetailProps) {
	if (!product) {
		return (
			<Container title="Product not found">
				<h1>Product not found</h1>
			</Container>
		);
	}
	const [selectedColor, setSelectedColor] = useState(product.colors[0]);

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
		<Container title={product?.title}>
			<div className="py-4">
				<div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
					{/* Image gallery */}
					<ImageGallery images={product?.images} />

					{/* Product info */}
					<ProductInfo
						product={product}
						selectedColor={selectedColor}
						setSelectedColor={setSelectedColor}
					/>
				</div>

				{/* Description */}
				<ProductDescription description={product.description} />

				{/* Similar products */}
				<SimilarProducts />
			</div>
		</Container>
	);
}
