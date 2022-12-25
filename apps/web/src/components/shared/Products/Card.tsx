import { InferQueryOutput } from "@/utils/trpc";
import { Flex, PrettyImage } from "@ecommerce/ui";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { AddToBagIconButton } from "../Bag";
import { useCurrencyFormatter } from "../formatters";
import { WishlistIconButton } from "../Wishlist";

export interface ProductCardProps {
	product: InferQueryOutput<"products">["data"][number];
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const currencyFormater = useCurrencyFormatter();
	const router = useRouter();

	const price = useMemo(
		() => currencyFormater.format(product.price),
		[currencyFormater, product.price]
	);

	const brands = useMemo(() => {
		const brands = router.query["brands"] as string;
		if (brands && brands.includes("[") && brands.includes("]")) {
			let b = brands
				.slice(1, -1)
				.split(".")
				.map((b) => Number(b))
				.filter((b) => b !== 0);
			b.push(product.manufacturer.id);

			// remove duplicates
			b = [...new Set(b)];

			return b;
		}
		return [product.manufacturer.id];
	}, [router.query, product.manufacturer.id]);

	const path = useMemo(() => {
		let path = router.asPath;

		// remove brands query param (brands=[{number},]), if it exists
		if (path.includes("?brands=")) {
			path = path.replace(/\?brands=\[[0-9,]*\]/, "");
		} else if (path.includes("&brands=")) {
			path = path.replace(/\&brands=\[[0-9,]*\]/, "");
		}
		return path;
	}, [router.asPath]);

	return (
		<Flex direction="col" className="space-y-2 font-display">
			<PrettyImage
				src={product.thumbnailImage}
				alt={`${product.title} image`}
				className="h-64"
			/>
			<Link
				href={`${path}${path.includes("?") ? "&" : "?"}brands=[${brands.join(
					","
				)}]`}
			>
				{product.manufacturer.name}
			</Link>
			<h3>
				<Link href={`/products/${product.slug}`}>{product.title}</Link>
			</h3>
			<Flex items="center" className="w-full">
				<p>{price}</p>
				<div className="flex-1" />
				<WishlistIconButton productId={product.id} />
				<AddToBagIconButton productSlug={product.slug} />
			</Flex>
		</Flex>
	);
};
