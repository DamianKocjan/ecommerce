import { Info } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";

import { Alert, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";
import type { Product } from "~/hooks/use-bag-data";
import { useCurrencyFormatter } from "~/hooks/use-formatter";

export function OrderSummaryCard({
	products,
	subtotal,
}: {
	products: Product[];
	subtotal: number;
}) {
	const formatted = useOrderSummaryInformation(subtotal);

	return (
		<Card className="overflow-hidden">
			<CardHeader className="bg-muted/50 flex flex-row items-start">
				<CardTitle>Order Summary</CardTitle>
			</CardHeader>
			<CardContent className="p-6 text-sm">
				<div className="grid gap-3">
					<div className="font-semibold">Order Details</div>
					<ul className="grid gap-3">
						{products.length > 0 ? (
							products.map((product) => (
								<OrderSummaryItem
									key={`order-summary-item-${product.id}`}
									product={product}
								/>
							))
						) : (
							<EmptyState />
						)}
					</ul>
					<Separator className="my-2" />
					<ul className="grid gap-3">
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">Subtotal</span>
							<span>{formatted.subtotal}</span>
						</li>
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">Shipping</span>
							<span>{formatted.shipping}</span>
						</li>
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">Tax</span>
							<span>{formatted.tax}</span>
						</li>
						<li className="flex items-center justify-between font-semibold">
							<span className="text-muted-foreground">Total</span>
							<span>{formatted.total}</span>
						</li>
					</ul>
				</div>
			</CardContent>
			<CardFooter>
				<Button asChild className="w-full">
					<Link href="/checkout">Proceed to Checkout</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}

function useOrderSummaryInformation(subtotal: number) {
	const currencyFormatter = useCurrencyFormatter();

	const shipping = React.useMemo(() => subtotal * 0.1, [subtotal]);
	const tax = React.useMemo(() => subtotal * 0.1, [subtotal]);
	const total = React.useMemo(
		() => subtotal + shipping + tax,
		[subtotal, shipping, tax],
	);

	const subtotalFormatted = currencyFormatter.format(subtotal);
	const shippingFormatted = currencyFormatter.format(shipping);
	const taxFormatted = currencyFormatter.format(tax);
	const totalFormatted = currencyFormatter.format(total);

	return {
		subtotal: subtotalFormatted,
		shipping: shippingFormatted,
		tax: taxFormatted,
		total: totalFormatted,
	};
}

function OrderSummaryItem({ product }: { product: Product }) {
	const formatter = useCurrencyFormatter();
	const priceFormatted = formatter.format(product.price);
	const totalPriceFormatted = formatter.format(
		product.price * product.quantity,
	);

	return (
		<li className="flex items-center justify-between">
			<span className="text-muted-foreground">
				{product.product.title} &times; <span>{product.quantity}</span>
			</span>

			{product.quantity > 1 ? (
				<span>
					<span className="text-muted-foreground" title="Price per item">
						({priceFormatted}){" "}
					</span>
					{totalPriceFormatted}
				</span>
			) : (
				<span>{totalPriceFormatted}</span>
			)}
		</li>
	);
}

function EmptyState() {
	return (
		<Alert>
			<Info className="h-4 w-4" />
			<AlertTitle>Your cart is empty!</AlertTitle>
		</Alert>
	);
}

export function OrderSummaryCardSkeleton() {
	return (
		<Card className="overflow-hidden">
			<CardHeader className="bg-muted/50 flex flex-row items-start">
				<CardTitle>Order Summary</CardTitle>
			</CardHeader>
			<CardContent className="p-6 text-sm">
				<div className="grid gap-3">
					<div className="font-semibold">Order Details</div>
					<ul className="grid gap-3">
						<OrderSummaryItemSkeleton withShorterName />
						<OrderSummaryItemSkeleton withQuantity />
						<OrderSummaryItemSkeleton />
					</ul>
					<Separator className="my-2" />
					<ul className="grid gap-3">
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">Subtotal</span>
							<Skeleton className="h-3 w-12" />
						</li>
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">Shipping</span>{" "}
							<Skeleton className="h-3 w-10" />
						</li>
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">Tax</span>{" "}
							<Skeleton className="h-3 w-10" />
						</li>
						<li className="flex items-center justify-between font-semibold">
							<span className="text-muted-foreground">Total</span>{" "}
							<Skeleton className="h-3 w-14" />
						</li>
					</ul>
				</div>
			</CardContent>
			<CardFooter>
				<Button className="w-full" disabled>
					Proceed to Checkout
				</Button>
			</CardFooter>
		</Card>
	);
}

function OrderSummaryItemSkeleton({
	withQuantity,
	withShorterName,
}: {
	withQuantity?: boolean;
	withShorterName?: boolean;
}) {
	return (
		<li className="flex items-center justify-between">
			{withShorterName ? (
				<Skeleton className="h-3 w-1/3" />
			) : (
				<Skeleton className="h-3 w-1/2" />
			)}

			{withQuantity ? (
				<Skeleton className="h-3 w-1/4" />
			) : (
				<Skeleton className="h-3 w-12" />
			)}
		</li>
	);
}
