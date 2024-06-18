import React from "react";

import { trpc, type RouterOutputs } from "~/utils/trpc";

export type Product = RouterOutputs["product"]["bag"][number] & {
	quantity: number;
};

export function useBagData(products: { id: number; quantity: number }[]) {
	const query = trpc.product.bag.useQuery(
		{ products: products.map((prod) => prod.id) },
		{
			enabled: !!products.length,
			refetchOnWindowFocus: false,
		},
	);

	const combinedProductsData = React.useMemo(() => {
		if (!query.data) {
			return [];
		}
		return products.reduce((acc, prod) => {
			const product = query.data.find((p) => p.id === prod.id);

			if (product) {
				acc.push({
					...product,
					quantity: prod.quantity,
				});
			}
			return acc;
		}, [] as Product[]);
	}, [query.data, products]);
	const subtotal = React.useMemo(
		() =>
			combinedProductsData.reduce(
				(acc, prod) => acc + prod.price * prod.quantity,
				0,
			),
		[combinedProductsData],
	);

	return {
		combinedProductsData,
		subtotal,
		query,
	};
}
