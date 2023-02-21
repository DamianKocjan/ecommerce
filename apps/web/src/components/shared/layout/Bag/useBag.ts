import { useCallback, useMemo } from "react";

import { useBag as useBagStore } from "../../../../features/bag";

export function useBag(productSlug: string) {
	const { addToBag, removeFromBag } = useBagStore();
	const products = useBagStore((state) => state.products);

	const isInBag = useMemo(
		() =>
			typeof window !== "undefined" ? products.includes(productSlug) : false,
		[products, productSlug],
	);

	const handleToggleBag = useCallback(
		(e: React.FormEvent<HTMLButtonElement>) => {
			e.preventDefault();

			isInBag ? removeFromBag(productSlug) : addToBag(productSlug);
		},
		[addToBag, isInBag, productSlug, removeFromBag],
	);

	return {
		handleToggleBag,
		isInBag,
	};
}
