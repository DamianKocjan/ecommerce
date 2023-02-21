import create from "zustand";
import { persist } from "zustand/middleware";

interface BagState {
	products: string[];
	addToBag: (productSlug: string) => void;
	clearBag: () => void;
	removeFromBag: (productSlug: string) => void;
}

export const useBag = create(
	persist<BagState>(
		(set) => ({
			products: [],
			addToBag: (productSlug) =>
				set((prev) => ({
					products: [...new Set([...prev.products, productSlug])],
				})),
			clearBag: () => set(() => ({ products: [] })),
			removeFromBag: (productSlug) =>
				set((prev) => ({
					products: prev.products.filter((prod) => prod !== productSlug),
				})),
		}),
		{ name: "cart" },
	),
);
