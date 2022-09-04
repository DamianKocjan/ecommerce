import { useBag as useBagStore } from "@/features/bag";
import { useCallback, useMemo } from "react";

export function useBag(productId: number) {
	const { addToBag, removeFromBag } = useBagStore();
	const items = useBagStore((state) => state.content);

	const isInBag = useMemo(() => items.includes(productId), [items, productId]);

	const handleToggleBag = useCallback(
		(e: React.FormEvent<HTMLButtonElement>) => {
			e.preventDefault();

			isInBag ? removeFromBag(productId) : addToBag(productId);
		},
		[addToBag, isInBag, productId, removeFromBag]
	);

	return {
		handleToggleBag,
		isInBag,
	};
}
