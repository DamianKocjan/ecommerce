"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { CartButton } from "~/components/shop/cart-button";
import { WishlistButton } from "~/components/shop/wishlist-button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { Large, Muted } from "~/components/ui/typography";
import { useFilters } from "~/contexts/filters-context";
import { useCurrencyFormatter } from "~/hooks/use-formatter";

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

export function ProductCard({ product }: Props) {
	const { format } = useCurrencyFormatter();
	const { newPathFrom } = useFilters();
	const path = React.useMemo(
		() =>
			newPathFrom({
				brands: [product.manufacturer.id],
			}),
		[newPathFrom, product.manufacturer.id],
	);

	const sku = product.skus[DEFAULT_SKU_INDEX]!;
	const onlyOneVariant = product.skus.length === 1;

	return (
		<Card>
			<CardHeader>
				<Image
					src={sku.images[sku.thumbnailImage]!.url}
					alt={`Thumbnail image of ${product.title}`}
					width={800}
					height={600}
					className="h-64 w-full object-cover object-center"
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

				<Muted>
					<Link href={path}>{product.manufacturer.name}</Link>
				</Muted>

				<div className="mt-4 flex items-center gap-2">
					<Large className="font-mono">{format(sku.price)}</Large>
					<div className="mr-auto" />

					<WishlistButton productSkuId={sku.id} />
					<CartButton productSkuId={sku.id} />
				</div>
			</CardContent>
		</Card>
	);
}

export function ProductCardSkeleton() {
	return (
		<Card>
			<CardHeader>
				<Skeleton className="h-64 w-full" />
			</CardHeader>
			<CardContent>
				<Skeleton className="h-6 w-3/4" />

				<Skeleton className="mt-2 h-3 w-1/3" />

				<div className="mt-4 flex items-center">
					<Skeleton className="h-8 w-20" />
					<Skeleton className="ml-auto h-10 w-20" />
				</div>
			</CardContent>
		</Card>
	);
}
