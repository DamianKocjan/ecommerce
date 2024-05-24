import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

import { Flex } from "~/components/shared/core/Flex";
import { PrettyImage } from "~/components/shared/core/PrettyImage";
import { useCurrencyFormatter } from "~/components/shared/hooks/useCurrencyFormatter";
import { AddToBagIconButton } from "../Bag";
import { WishlistIconButton } from "../Wishlist";
import { Product } from "./types";

export interface ProductCardProps<T extends Product> {
	product: T;
}

export function ProductCard<T extends Product>({
	product,
}: ProductCardProps<T>) {
	const currencyFormatter = useCurrencyFormatter();
	const router = useRouter();

	const price = useMemo(
		() => currencyFormatter.format(product.price),
		[currencyFormatter, product.price],
	);

	const brands = useMemo(() => {
		const brands = router.query["brands"] as string;
		if (brands && brands.includes("[") && brands.includes("]")) {
			let b = brands
				.slice(1, -1)
				.split(".")
				.map((b) => Number(b))
				.filter(Boolean);
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
			path = path.replace(/&brands=\[[0-9,]*\]/, "");
		}
		return path;
	}, [router.asPath]);

	return (
		<Flex direction="col" className="group space-y-2 font-display">
			<div className="relative">
				<PrettyImage
					src={product.skus[0]!.images[product.skus[0]!.thumbnailImage]!.url}
					alt={`${product.title} image`}
					className="h-64"
				/>
				{product.skus.length > 1 ? (
					<div className="absolute bottom-0 right-0 hidden bg-black group-hover:block">
						<div className="flex justify-end gap-1 p-1">
							<>
								{product.skus.map((sku) => (
									<Image
										key={sku.sku}
										src={sku.images[sku.thumbnailImage]!.url}
										alt={`${product.title} ${sku.sku} image`}
										width={48}
										height={24}
									/>
								))}
								{product.skus.map((sku) => (
									<Image
										key={sku.sku}
										src={sku.images[sku.thumbnailImage]!.url}
										alt={`${product.title} ${sku.sku} image`}
										width={48}
										height={24}
									/>
								))}
								{product.skus.map((sku) => (
									<Image
										key={sku.sku}
										src={sku.images[sku.thumbnailImage]!.url}
										alt={`${product.title} ${sku.sku} image`}
										width={48}
										height={24}
									/>
								))}
								{product.skus.map((sku) => (
									<Image
										key={sku.sku}
										src={sku.images[sku.thumbnailImage]!.url}
										alt={`${product.title} ${sku.sku} image`}
										width={48}
										height={24}
									/>
								))}
							</>
						</div>
					</div>
				) : null}
			</div>
			<Link
				href={`${path}${path.includes("?") ? "&" : "?"}brands=[${brands.join(
					",",
				)}]`}
			>
				{product.manufacturer.name}
			</Link>
			<h3>
				<Link href={`/products/${product.slug}_${product.skus[0]!.sku}`}>
					{product.title}
				</Link>
			</h3>
			<Flex items="center" className="w-full">
				<p>{price}</p>
				<div className="flex-1" />
				<WishlistIconButton productId={product.skus[0]!.id} />
				<AddToBagIconButton productSlug={product.slug} />
			</Flex>
		</Flex>
	);
}
