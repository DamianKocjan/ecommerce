import { useCallback, useMemo } from "react";

import { useBagStore } from "./store";

export function useBag(productSkuId: number) {
	const { addToBag, removeFromBag } = useBagStore();
	const products = useBagStore((state) => state.products);

	const isInBag = useMemo(
		() =>
			typeof window !== "undefined" ? products.includes(productSkuId) : false,
		[products, productSkuId],
	);

	const handleToggleBag = useCallback(
		(e: React.FormEvent<HTMLButtonElement>) => {
			e.preventDefault();

			isInBag ? removeFromBag(productSkuId) : addToBag(productSkuId);
		},
		[addToBag, isInBag, productSkuId, removeFromBag],
	);

	return {
		handleToggleBag,
		isInBag,
	};
}
