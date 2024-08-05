"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import React from "react";

import { ProductCard } from "~/components/shop/product-card";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

const RECOMMENDED_PRODUCTS = Array.from({ length: 12 }).map((_, index) => ({
	id: index,
	title: "Product",
	slug: "product",
	manufacturer: {
		id: 1,
		name: "Manufacturer",
	},
	skus: [
		{
			id: 1,
			sku: "sku",
			price: 100,
			discount: 0,
			images: [
				{
					url: `https://picsum.photos/seed/${index}/800/600`,
				},
			],
			thumbnailImage: 0,
		},
	],
}));

const CAROUSEL_SIZE = 4;

export function RecommendedProducts({ productId }: { productId: number }) {
	const [currentSlide, setCurrentSlide] = React.useState(0);

	return (
		<div className="col-span-2">
			<Separator className="my-6" />

			<div className="flex gap-6">
				{RECOMMENDED_PRODUCTS.slice(
					currentSlide * CAROUSEL_SIZE,
					currentSlide * CAROUSEL_SIZE + CAROUSEL_SIZE,
				).map((product, index) => (
					<div className="row-start-1 w-80" key={index}>
						<ProductCard withoutFiltersProvider product={product} />
					</div>
				))}
			</div>

			<div className="mt-6 flex justify-end gap-4">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setCurrentSlide((prev) => prev - 1)}
					disabled={currentSlide === 0}
				>
					<span className="sr-only">Previous</span>
					<CaretLeft />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setCurrentSlide((prev) => prev + 1)}
					disabled={
						currentSlide * CAROUSEL_SIZE + CAROUSEL_SIZE >=
						RECOMMENDED_PRODUCTS.length
					}
				>
					<span className="sr-only">Next</span>
					<CaretRight />
				</Button>
			</div>
		</div>
	);
}
