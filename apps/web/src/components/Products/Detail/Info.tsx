import { AddToBagButton } from "@/components/shared/Bag";
import { useCurrencyFormatter } from "@/components/shared/formatters";
import { WishlistIconButton } from "@/components/shared/Wishlist";
import { InferQueryOutput } from "@/utils/trpc";
import { Flex } from "@ecommerce/ui";
import React, { useMemo } from "react";
import { ProductColors } from "./Colors";
import { ProductDetails } from "./Details";
import { Rating } from "./Rating";

export interface ProductInfoProps {
	product: InferQueryOutput<"product">;
	selectedColor: { name: string };
	setSelectedColor: (color: { name: string }) => void;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
	product,
	selectedColor,
	setSelectedColor,
}) => {
	const currencyFormater = useCurrencyFormatter();

	const price = useMemo(
		() => currencyFormater.format(product.price),
		[currencyFormater, product.price]
	);

	return (
		<div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
			<h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
				{product.title}
			</h1>

			<div className="mt-3">
				<h2 className="sr-only">Product information</h2>
				<p className="text-3xl text-gray-900">{price}</p>
			</div>

			{/* Reviews */}
			<div className="mt-3">
				<h3 className="sr-only">Reviews</h3>
				<Rating rating={3.6} />
			</div>

			<div className="mt-6">
				<h3 className="sr-only">Short description</h3>

				<div
					className="text-base text-gray-700 space-y-6"
					dangerouslySetInnerHTML={{ __html: product.shortDescription }}
				/>
			</div>

			<form className="mt-6">
				{/* Colors */}
				{/* FIXME: do not provide state setters to child component */}
				<ProductColors
					colors={product.colors}
					selectedColor={selectedColor}
					setSelectedColor={setSelectedColor}
				/>

				<Flex className="mt-10 sm:flex-col1">
					<AddToBagButton productSlug={product.slug} />

					<WishlistIconButton productId={product.id} />
				</Flex>
			</form>

			<ProductDetails details={product.details} />
		</div>
	);
};
