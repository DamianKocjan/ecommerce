"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

import { CartButton } from "~/components/shop/cart-button";
import { WishlistButton } from "~/components/shop/wishlist-button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Large, Muted } from "~/components/ui/typography";
import { useCurrencyFormatter } from "~/hooks/use-formatter";
import { isNumber } from "~/utils/primitives";

const DEFAULT_SKU_INDEX = 0;

type Manufacturer = {
	id: number;
	name: string;
};

type Sku = {
	id: number;
	sku: string;
	price: number;
	discount: number | undefined;
	thumbnailImage: number;
	images: {
		url: string;
	}[];
};

type Product = {
	id: number;
	title: string;
	slug: string;
	manufacturer: Manufacturer;
	skus: Sku[];
};

type Props = {
	product: Product;
};

export const ProductCard = React.memo(function ProductCard({ product }: Props) {
	const { format } = useCurrencyFormatter();
	const newPathWithProductManufacturerId = useNewPathWithProductManufacturerId(
		product.manufacturer.id,
	);

	const sku = product.skus[DEFAULT_SKU_INDEX]!;
	const onlyOneVariant = product.skus.length === 1;

	return (
		<Card className="h-96">
			<CardHeader>
				<Image
					src={sku.images[sku.thumbnailImage]!.url}
					alt={`Thumbnail image of ${product.title}`}
					width={800}
					height={600}
				/>
			</CardHeader>
			<CardContent>
				<div className="flex items-center">
					<CardTitle
						className="text-ellipsis text-nowrap text-xl"
						title={product.title}
					>
						<Link href={`/products/${product.slug}/${sku.sku}`}>
							{product.title}
						</Link>
					</CardTitle>
				</div>
				<div className="text-muted-foreground text-sm">
					<Muted>
						<Link href={newPathWithProductManufacturerId}>
							{product.manufacturer.name}
						</Link>
					</Muted>
					<div className="mt-4 flex items-center">
						<Large className="font-mono">{format(sku.price)}</Large>
						<div className="mr-auto" />

						<WishlistButton productSkuId={sku.id} />
						<CartButton productSkuId={sku.id} />
					</div>
				</div>
			</CardContent>
		</Card>
	);
});

function useNewPathWithProductManufacturerId(productManufacturerId: number) {
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
				.split(",")
				.filter(isNumber)
				.map(Number);
			brands.push(productManufacturerId);

			// remove duplicates
			const uniqueBrands = [...new Set(brands)];

			return `${path}?brands=[${uniqueBrands.join(",")}]${str}`;
		}
		return `${path}?brands=[${productManufacturerId}]${str}`;
	}, [path, productManufacturerId, searchParams]);

	return manufacturerPath;
}
