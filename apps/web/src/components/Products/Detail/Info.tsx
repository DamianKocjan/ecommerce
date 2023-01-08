import React, { useMemo } from "react";

import { RouterOutputs } from "../../../utils/trpc";
import { Flex } from "../../shared/core/Flex";
import { useCurrencyFormatter } from "../../shared/hooks/useCurrencyFormatter";
import { AddToBagButton } from "../../shared/layout/Bag";
import { WishlistIconButton } from "../../shared/layout/Wishlist";
import { ProductColors } from "./Colors";
import { ProductDetails } from "./Details";
import { Rating } from "./Rating";

type Product = RouterOutputs["product"]["get"];
type Color = Product["colors"][number];

export interface ProductInfoProps {
	product: Product;
	selectedColor?: Color;
	setSelectedColor: (color: Color) => void;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
	product,
	selectedColor,
	setSelectedColor,
}) => {
	const currencyFormater = useCurrencyFormatter();

	const price = useMemo(
		() => currencyFormater.format(product.price),
		[currencyFormater, product.price],
	);

	return (
		<div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
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
					className="space-y-6 text-base text-gray-700"
					dangerouslySetInnerHTML={{ __html: product.shortDescription }}
				/>
			</div>

			<form className="mt-6">
				{/* Colors */}
				{/* FIXME: do not provide state setters to child component */}
				<ProductColors
					colors={product.colors}
					// @ts-ignore
					selectedColor={selectedColor}
					setSelectedColor={setSelectedColor}
				/>

				<Flex className="sm:flex-col1 mt-10">
					<AddToBagButton productSlug={product.slug} />

					<WishlistIconButton productId={product.id} />
				</Flex>
			</form>

			{/* @ts-ignore */}
			<ProductDetails details={product.details} />
		</div>
	);
};
