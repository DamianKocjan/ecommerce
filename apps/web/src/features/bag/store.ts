import create from "zustand";
import { persist } from "zustand/middleware";

interface BagState {
	products: string[];
	addToBag: (product: string) => void;
	clearBag: () => void;
	removeFromBag: (product: string) => void;
}

export const useBag = create(
	persist<BagState>(
		(set) => ({
			products: [],
			addToBag: (product) =>
				set((state) => ({
					...state,
					products: [...new Set([...state.products, product])],
				})),
			clearBag: () => set((state) => ({ ...state, products: [] })),
			removeFromBag: (product) =>
				set((state) => ({
					...state,
					products: state.products.filter((prod) => prod !== product),
				})),
		}),
		{ name: "cart" }
	)
);
