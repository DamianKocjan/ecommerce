import { ShoppingBag, WarningCircle } from "@phosphor-icons/react";
import { Session } from "next-auth";
import Link from "next/link";
import React from "react";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Skeleton } from "~/components/ui/skeleton";
import { H4, Muted } from "~/components/ui/typography";
import { useBag } from "~/contexts/bag-context";
import { useCurrencyFormatter } from "~/hooks/use-formatter";
import { trpc } from "~/utils/trpc";
import { BagProductItem, BagProductsSkeleton, type Product } from "./bag-item";

const MAX_ITEMS = 9 as const;

export function BagDropdown({ session }: { session: Session | null }) {
	const {
		numberOfItems,
		combinedProductsData,
		subtotal,
		isLoading,
		isError,
		error,
	} = useBagData();

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="relative h-8 w-8 rounded-full"
				>
					<span className="sr-only">Your bag</span>
					<ShoppingBag className="h-6 w-6" aria-hidden="true" />
					{numberOfItems > 0 ? (
						<span className="bg-primary absolute right-1 top-1 z-10 h-2 w-2 rounded-full" />
					) : null}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<div className="grid gap-4">
					{numberOfItems === 0 ? (
						<>
							<BagEmptyState />

							<Button asChild className="w-full">
								<Link href="/cart">View Shopping Bag</Link>
							</Button>
						</>
					) : (
						<>
							<BagHeader />

							{isLoading ? (
								<>
									<BagProductsSkeleton />
									<BagValueInfoSkeleton />
								</>
							) : isError ? (
								<BagErrorState
									error={
										error?.message ||
										"An error occurred while loading your shopping bag"
									}
								/>
							) : (
								<>
									<ScrollArea className="max-h-80">
										<div className="grid gap-4">
											{combinedProductsData.map((product) => (
												<BagProductItem key={product.id} product={product} />
											))}

											{numberOfItems > MAX_ITEMS ? (
												<div className="flex justify-center">
													<Muted>
														And {numberOfItems - MAX_ITEMS} more items
													</Muted>
												</div>
											) : null}
										</div>
										<ScrollBar orientation="vertical" />
									</ScrollArea>

									<BagValueInfo subtotal={subtotal} />
								</>
							)}

							<BagLinks isDisabled={!session || isLoading || isError} />
						</>
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
}

function useBagData() {
	const { products } = useBag();
	const itemsSlice = React.useMemo(
		() => products.slice(0, MAX_ITEMS),
		[products],
	);

	const { data, isLoading, isError, error } = trpc.product.bag.useQuery(
		{ products: itemsSlice.map((prod) => prod.id) },
		{
			enabled: !!products.length,
			refetchOnWindowFocus: false,
		},
	);

	const combinedProductsData = React.useMemo(() => {
		if (!data) {
			return [];
		}
		return products.reduce((acc, prod) => {
			const product = data.find((p) => p.id === prod.id);

			if (product) {
				acc.push({
					...product,
					quantity: prod.quantity,
				});
			}
			return acc;
		}, [] as Product[]);
	}, [data, products]);
	const subtotal = React.useMemo(
		() =>
			combinedProductsData.reduce(
				(acc, prod) => acc + prod.price * prod.quantity,
				0,
			),
		[combinedProductsData],
	);

	return {
		numberOfItems: products.length,
		combinedProductsData,
		subtotal,
		isLoading,
		isError,
		error,
	};
}

function BagHeader() {
	return (
		<div className="space-y-2">
			<H4>Your Shopping Bag</H4>
			<Muted>Review and adjust the items in your shopping bag.</Muted>
		</div>
	);
}

function BagEmptyState() {
	return (
		<div className="flex flex-col items-center justify-center space-y-2">
			<ShoppingBag className="h-12 w-12" />
			<H4>Your bag is empty</H4>
			<Muted>Start adding items to your bag</Muted>
		</div>
	);
}

function BagErrorState({ error }: { error: string }) {
	return (
		<Alert variant="destructive">
			<WarningCircle className="h-4 w-4" />
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>{error}</AlertDescription>
		</Alert>
	);
}

function BagLinks({ isDisabled }: { isDisabled: boolean }) {
	return (
		<>
			<Button asChild className="w-full" isDisabled={isDisabled}>
				<Link
					href={isDisabled ? "" : "/checkout"}
					onClick={isDisabled ? (e) => e.preventDefault() : undefined}
				>
					Checkout
				</Link>
			</Button>
			<Button variant="link" asChild className="w-full text-inherit">
				<Link href="/cart">View Shopping Bag</Link>
			</Button>
		</>
	);
}

function BagValueInfo({ subtotal }: { subtotal: number }) {
	const formattedSubtotal = useCurrencyFormatter().format(subtotal);

	return (
		<div className="flex items-center justify-between">
			<div>Subtotal</div>
			<div className="font-medium tabular-nums">{formattedSubtotal}</div>
		</div>
	);
}
function BagValueInfoSkeleton() {
	return (
		<div className="flex items-center justify-between">
			<div>Subtotal</div>
			<Skeleton className="h-6 w-14" />
		</div>
	);
}
