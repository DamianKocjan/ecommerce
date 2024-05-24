"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

import { useCurrencyFormatter } from "~/components/shared/hooks/useCurrencyFormatter";
import { CartButton } from "~/components/shop/cart-button";
import { WishlistButton } from "~/components/shop/wishlist-button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Large, Muted } from "~/components/ui/typography";

export const ProductCard = React.memo(function ProductCard({
	product,
}: {
	product: {
		id: number;
		title: string;
		slug: string;
		price: number;
		manufacturer: {
			id: number;
			name: string;
		};
		skus: {
			id: string;
			sku: string;
			title: string | null;
			price: number | undefined;
			discount: number | undefined;
			thumbnailImage: number;
			images: {
				url: string;
			}[];
		}[];
	};
}) {
	const { format } = useCurrencyFormatter();
	const searchParams = useSearchParams();
	const path = usePathname();

	const manufacturerPath = React.useMemo(() => {
		// join other query params
		const otherParams = new URLSearchParams(searchParams);
		let str = "";
		otherParams.forEach(
			(value, key) => (str += key !== "brands" ? `&${key}=${value}` : ""),
		);

		if (searchParams.get("brands")) {
			const brands = searchParams
				.get("brands")!
				.slice(1, -1)
				.split(".")
				.map(Number);
			brands.push(product.manufacturer.id);

			// remove duplicates
			const uniqueBrands = [...new Set(brands)];

			return `${path}?brands=[${uniqueBrands.join(",")}]${str}`;
		}
		return `${path}?brands=[${product.manufacturer.id}]${str}`;
	}, [path, product.manufacturer.id, searchParams]);

	return (
		<Card>
			<CardHeader>
				<Image
					src={product.skus[0]!.images[product.skus[0]!.thumbnailImage]!.url}
					alt=""
					width={800}
					height={600}
				/>
			</CardHeader>
			<CardContent>
				<div className="flex items-center">
					<CardTitle>
						<Link href={`/products/${product.slug}/${product.skus[0]!.sku}`}>
							{product.skus[0]!.title || product.title}
						</Link>
					</CardTitle>
					<div className="ml-auto" />
					<Large className="font-mono">
						{format(product.skus[0]!.price || product.price)}
					</Large>
				</div>
				<div className="text-muted-foreground text-sm">
					<Muted>
						<Link href={manufacturerPath}>{product.manufacturer.name}</Link>
					</Muted>
					<div className="flex justify-end">
						<WishlistButton productSkuId={product.skus[0]!.id} />
						<CartButton productSkuId={product.skus[0]!.id} />
					</div>
				</div>
			</CardContent>
		</Card>
	);
});
