import { useBag as useBagStore } from "@/features/bag";
import { useCallback, useMemo } from "react";

export function useBag(productSlug: string) {
	const { addToBag, removeFromBag } = useBagStore();
	const products = useBagStore((state) => state.products);

	const isInBag = useMemo(
		() => products.includes(productSlug),
		[products, productSlug]
	);

	const handleToggleBag = useCallback(
		(e: React.FormEvent<HTMLButtonElement>) => {
			e.preventDefault();

			isInBag ? removeFromBag(productSlug) : addToBag(productSlug);
		},
		[addToBag, isInBag, productSlug, removeFromBag]
	);

	return {
		handleToggleBag,
		isInBag,
	};
}
