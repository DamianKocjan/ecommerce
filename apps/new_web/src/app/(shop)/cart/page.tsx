"use client";

import { useBag } from "~/contexts/bag-context";
import { useBagData } from "~/hooks/use-bag-data";
import { BagProductsCard, BagProductsCardSkeleton } from "./bag-products.card";
import {
	OrderSummaryCard,
	OrderSummaryCardSkeleton,
} from "./order-summary-card";
import { PromoCodeCard } from "./promo-code-card";

export default function Cart() {
	const { products } = useBag();
	const {
		combinedProductsData,
		subtotal,
		query: { isLoading },
	} = useBagData(products);

	return (
		<div className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
			<div className="grid gap-4 md:grid-cols-2">
				<div>
					{isLoading ? (
						<BagProductsCardSkeleton />
					) : (
						<BagProductsCard
							products={combinedProductsData}
							subtotal={subtotal}
						/>
					)}
				</div>
				<div className="flex flex-col-reverse gap-4 md:flex-col">
					{isLoading ? (
						<OrderSummaryCardSkeleton />
					) : (
						<OrderSummaryCard
							products={combinedProductsData}
							subtotal={subtotal}
						/>
					)}
					<PromoCodeCard />
				</div>
			</div>
		</div>
	);
}
