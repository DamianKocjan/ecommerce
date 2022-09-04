import create from "zustand";
import { persist } from "zustand/middleware";

interface BagState {
	content: number[];
	addToBag: (productId: number) => void;
	clearBag: () => void;
	removeFromBag: (productId: number) => void;
}

export const useBag = create(
	persist<BagState>(
		(set) => ({
			content: [],
			addToBag: (productId) =>
				set((state) => ({
					...state,
					content: [...new Set([...state.content, productId])],
				})),
			clearBag: () => set((state) => ({ ...state, content: [] })),
			removeFromBag: (productId) =>
				set((state) => ({
					...state,
					content: state.content.filter((prodId) => prodId !== productId),
				})),
		}),
		{ name: "cart" }
	)
);
