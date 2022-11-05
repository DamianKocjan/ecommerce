import { useBag as useBagStore } from "@/features/bag";
import { useCallback, useMemo } from "react";

export function useBag(product: string) {
	const { addToBag, removeFromBag } = useBagStore();
	const products = useBagStore((state) => state.products);

	const isInBag = useMemo(
		() => products.includes(product),
		[products, product]
	);

	const handleToggleBag = useCallback(
		(e: React.FormEvent<HTMLButtonElement>) => {
			e.preventDefault();

			isInBag ? removeFromBag(product) : addToBag(product);
		},
		[addToBag, isInBag, product, removeFromBag]
	);

	return {
		handleToggleBag,
		isInBag,
	};
}
