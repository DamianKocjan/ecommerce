import { type Manufacturer, type Product } from "@ecommerce/prisma";
import { Flex, PrettyImage } from "@ecommerce/ui";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { AddToBagIconButton } from "../Bag";
import { useCurrencyFormatter } from "../formatters";
import { WishlistIconButton } from "../Wishlist";

export interface ProductCardProps {
	product: Product & { manufacturer: Manufacturer };
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const currencyFormater = useCurrencyFormatter();
	const router = useRouter();

	const price = useMemo(
		() => currencyFormater.format(product.price),
		[currencyFormater, product.price]
	);

	return (
		<Flex direction="col" className="space-y-2 font-display">
			<PrettyImage
				src="https://tailwindcss.com/_next/static/media/beach-house-interior-1.bc69273a536a51bb58092b2896b92e3a.jpg"
				alt={`${product.title} image`}
				className="h-64"
			/>
			<Link href={`${router.asPath}?brands=[${product.manufacturer.id}]`}>
				{product.manufacturer.name}
			</Link>
			<h3>
				<Link href={`/products/${product.slug}`}>{product.title}</Link>
			</h3>
			<Flex items="center" className="w-full">
				<p>{price}</p>
				<div className="flex-1" />
				<WishlistIconButton productId={product.id} />
				<AddToBagIconButton product={product.slug} />
			</Flex>
		</Flex>
	);
};
