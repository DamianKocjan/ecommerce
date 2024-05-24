"use client";

import { Heart, HeartBreak, ShoppingCartSimple } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

import { useCurrencyFormatter } from "~/components/shared/hooks/useCurrencyFormatter";
import { useBag } from "~/components/shared/layout/Bag/useBag";
import { useWishlist } from "~/components/shared/layout/Wishlist/useWishlist";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Large, Muted } from "~/components/ui/typography";

export const ProductCard = React.memo(function ProductCard({
	product,
}: {
	product: {
		id: string;
		product: {
			id: number;
			sku: string;
			title: string | null;
			price: number | undefined;
			discount: number | undefined;
			thumbnailImage: number;
			product: {
				title: string;
				slug: string;
				price: number;
				manufacturer: {
					id: number;
					name: string;
				};
			};
			images: {
				url: string;
			}[];
		};
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
			brands.push(product.product.product.manufacturer.id);

			// remove duplicates
			const uniqueBrands = [...new Set(brands)];

			return `${path}?brands=[${uniqueBrands.join(",")}]${str}`;
		}
		return `${path}?brands=[${product.product.product.manufacturer.id}]${str}`;
	}, [path, product.product.product.manufacturer.id, searchParams]);

	return (
		<Card>
			<CardHeader>
				<Image
					src={product.product.images[product.product.thumbnailImage]!.url}
					alt=""
					width={800}
					height={600}
				/>
			</CardHeader>
			<CardContent>
				<div className="flex items-center">
					<CardTitle>
						<Link
							href={`/products/${product.product.product.slug}/${product.product.sku}`}
						>
							{product.product.title || product.product.product.title}
						</Link>
					</CardTitle>
					<div className="ml-auto" />
					<Large className="font-mono">
						{format(product.product.price || product.product.product.price)}
					</Large>
				</div>
				<div className="text-muted-foreground text-sm">
					<Muted>
						<Link href={manufacturerPath}>
							{product.product.product.manufacturer.name}
						</Link>
					</Muted>
					<div className="flex justify-end">
						<WishlistButton productSkuId={product.id} />
						<CartButton productSkuId={product.id} />
					</div>
				</div>
			</CardContent>
		</Card>
	);
});

function CartButton({ productSkuId }: { productSkuId: string }) {
	const { handleToggleBag, isInBag } = useBag(productSkuId);

	return (
		<Button variant="ghost" onClick={handleToggleBag}>
			<span className="sr-only">Add to cart</span>
			<ShoppingCartSimple
				className="h-6 w-6"
				aria-hidden="true"
				weight={isInBag ? "fill" : undefined}
			/>
		</Button>
	);
}

function WishlistButton({ productSkuId }: { productSkuId: string }) {
	const { handleToggleWishlist, isInWishlist } = useWishlist(productSkuId);
	const [additionalClasses, setAdditionalClasses] = React.useState("");

	const handleMouseUp = React.useCallback(() => {
		if (!isInWishlist) {
			return;
		}

		setAdditionalClasses("animate-upShake");

		setTimeout(() => {
			setAdditionalClasses("");
		}, 600);
	}, [isInWishlist]);

	return (
		<Button
			variant="ghost"
			className="group"
			type="button"
			onClick={handleToggleWishlist}
			onMouseUp={handleMouseUp}
		>
			<span className="sr-only">Add to wishlist</span>
			{isInWishlist ? (
				<>
					<HeartBreak
						className={`hidden h-6 w-6 hover:animate-wiggle group-hover:block ${additionalClasses}`}
						aria-hidden="true"
						weight="fill"
					/>
					<Heart
						className={`h-6 w-6 hover:animate-wiggle group-hover:hidden ${additionalClasses}`}
						aria-hidden="true"
						weight="fill"
					/>
				</>
			) : (
				<Heart
					className={`h-6 w-6 hover:animate-wiggle ${additionalClasses}`}
					aria-hidden="true"
				/>
			)}
		</Button>
	);
}
