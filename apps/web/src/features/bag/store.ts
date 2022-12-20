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
				set((state) => ({
					...state,
					products: [...new Set([...state.products, productSlug])],
				})),
			clearBag: () => set((state) => ({ ...state, products: [] })),
			removeFromBag: (productSlug) =>
				set((state) => ({
					...state,
					products: state.products.filter((prod) => prod !== productSlug),
				})),
		}),
		{ name: "cart" }
	)
);
