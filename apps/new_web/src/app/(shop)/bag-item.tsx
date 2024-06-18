import { Minus, Plus } from "@phosphor-icons/react";
import Image from "next/image";

import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { Muted } from "~/components/ui/typography";
import { useBagDispatch } from "~/contexts/bag-context";
import { useCurrencyFormatter } from "~/hooks/use-formatter";
import type { RouterOutputs } from "~/utils/trpc";

export type Product = RouterOutputs["product"]["bag"][number] & {
	quantity: number;
};

export function BagProductItem({ product }: { product: Product }) {
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
					<h5 className="font-medium">{product.product.title}</h5>
					<Muted className="tabular-nums">{price}</Muted>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<Button
					variant="ghost"
					size="icon"
					onClick={() =>
						dispatch({
							type: "DECREASE_QUANTITY",
							productSkuId: product.id,
						})
					}
				>
					<span className="sr-only">Decrease quantity</span>
					<Minus className="h-4 w-4" />
				</Button>
				<p className="tabular-nums leading-7">{product.quantity}</p>
				<Button
					variant="ghost"
					size="icon"
					onClick={() =>
						dispatch({
							type: "INCREASE_QUANTITY",
							productSkuId: product.id,
						})
					}
				>
					<span className="sr-only">Increase quantity</span>
					<Plus className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}

function BagProductItemSkeleton() {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-4">
				<Skeleton className="h-16 w-16 rounded" />
				<div>
					<Skeleton className="h-4 w-24" />
					<Skeleton className="mt-1 h-3 w-16" />
				</div>
			</div>
			<div className="flex items-center">
				<Skeleton className="h-10 w-24" />
			</div>
		</div>
	);
}

export function BagProductsSkeleton() {
	return (
		<div className="grid gap-4">
			{Array.from({ length: 3 }).map((_, i) => (
				<BagProductItemSkeleton key={`bag-item-skeleton-${i}`} />
			))}
		</div>
	);
}
