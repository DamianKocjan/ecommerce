"use client";

import { X } from "@phosphor-icons/react";
import Image from "next/image";

import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { H3 } from "~/components/ui/typography";
import { useBagDispatch } from "~/contexts/bag-context";
import type { Product } from "~/hooks/use-bag-data";
import { useCurrencyFormatter } from "~/hooks/use-formatter";

export function BagProductsCard({
	products,
	subtotal,
}: {
	products: Product[];
	subtotal: number;
}) {
	const formattedSubtotal = useCurrencyFormatter().format(subtotal);

	return (
		<Card className="overflow-hidden">
			<CardHeader className="bg-muted/50 flex flex-col items-start">
				<CardTitle>Shopping Bag</CardTitle>
				<CardDescription className="max-w-lg text-balance leading-relaxed">
					Review your cart items and proceed to checkout.
				</CardDescription>
			</CardHeader>

			<CardContent className="p-6 text-sm">
				<div className="grid gap-4">
					{products.length > 0 ? (
						products.map((product) => (
							<ProductItem key={product.id} product={product} />
						))
					) : (
						<BagEmptyState />
					)}
				</div>
			</CardContent>

			<CardFooter className="flex items-center justify-between">
				<div className="text-muted-foreground">Subtotal</div>
				<div className="font-medium">{formattedSubtotal}</div>
			</CardFooter>
		</Card>
	);
}

function ProductItem({ product }: { product: Product }) {
	const dispatch = useBagDispatch();
	const price = useCurrencyFormatter().format(product.price * product.quantity);

	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-4">
				<Image
					src={product.images[product.thumbnailImage]!.url}
					width={64}
					height={64}
					alt="Product image"
					className="h-16 w-16 rounded"
				/>
				<div>
					<div className="font-medium">{product.product.title}</div>
					<div className="text-muted-foreground text-sm">
						Quantity: {product.quantity}
					</div>
				</div>
			</div>

			<div className="flex items-center gap-4">
				<div className="font-medium">{price}</div>
				<Button
					variant="ghost"
					size="icon"
					onClick={() =>
						dispatch({
							productSkuId: 1,
							type: "REMOVE_FROM_BAG",
						})
					}
				>
					<span className="sr-only">Remove from cart</span>
					<X className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}

function BagEmptyState() {
	return (
		<div className="flex flex-col items-center justify-center space-y-4 p-8">
			<Image
				src="/undraw_web_search_re_efla.svg"
				width={400}
				height={300}
				className="h-auto w-96"
				alt="Empty shopping bag"
			/>

			<H3 className="text-center">Your bag is empty!</H3>
		</div>
	);
}

export function BagProductsCardSkeleton() {
	return (
		<Card className="overflow-hidden">
			<CardHeader className="bg-muted/50 flex flex-col items-start">
				<CardTitle>Shopping Bag</CardTitle>
				<CardDescription className="max-w-lg text-balance leading-relaxed">
					Review your cart items and proceed to checkout.
				</CardDescription>
			</CardHeader>

			<CardContent className="p-6 text-sm">
				<div className="grid gap-4">
					<ProductItemSkeleton />
					<ProductItemSkeleton />
					<ProductItemSkeleton />
				</div>
			</CardContent>

			<CardFooter className="flex items-center justify-between">
				<div className="text-muted-foreground">Subtotal</div>
				<Skeleton className="h-4 w-14" />
			</CardFooter>
		</Card>
	);
}

function ProductItemSkeleton() {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-4">
				<Skeleton className="h-16 w-16 rounded" />
				<div>
					<Skeleton className="h-4 w-24" />
					<Skeleton className="mt-1 h-3 w-16" />
				</div>
			</div>
			<div className="flex items-center gap-4">
				<Skeleton className="h-10 w-24" />
				<Skeleton className="h-10 w-10 rounded" />
			</div>
		</div>
	);
}
