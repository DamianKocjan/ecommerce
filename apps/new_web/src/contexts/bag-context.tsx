"use client";

import React from "react";
import { z } from "zod";

// TODO: change data structure to be more like a map of productSkuId to quantity
const bagSchema = z.object({
	products: z.array(
		z.object({
			id: z.number(),
			quantity: z.number().min(1),
		}),
	),
});

type BagContextValue = z.infer<typeof bagSchema>;
type BagAction =
	| {
			type: "ADD_TO_BAG";
			productSkuId: number;
			quantity: number;
	  }
	| {
			type: "REMOVE_FROM_BAG";
			productSkuId: number;
	  }
	| {
			type: "CLEAR_BAG";
	  }
	| {
			type: "INCREASE_QUANTITY";
			productSkuId: number;
	  }
	| {
			type: "DECREASE_QUANTITY";
			productSkuId: number;
	  };

const BagContext = React.createContext<BagContextValue | null>(null);
BagContext.displayName = "BagContext";
const BagDispatchContext =
	React.createContext<React.Dispatch<BagAction> | null>(null);
BagDispatchContext.displayName = "BagDispatchContext";

const LOCAL_STORAGE_KEY = "cart" as const;
const DEFAULT_BAG_STATE: BagContextValue = { products: [] };

function saveToLocalStorage(state: BagContextValue) {
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
}

function getInitialBagState() {
	try {
		const item = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (!item) {
			// initialize the cart with an empty array
			saveToLocalStorage(DEFAULT_BAG_STATE);
			return DEFAULT_BAG_STATE;
		}

		const parsed = JSON.parse(item);
		const result = bagSchema.safeParse(parsed);

		if (!result.success) {
			console.error("Error parsing bag state from localStorage", result.error);
			localStorage.removeItem(LOCAL_STORAGE_KEY);
			return DEFAULT_BAG_STATE;
		}
		return result.data;
	} catch (error) {
		console.error("Error reading bag state from localStorage", error);
		localStorage.removeItem(LOCAL_STORAGE_KEY);
		return DEFAULT_BAG_STATE;
	}
}

const initialState = getInitialBagState();

const reducer = (state: BagContextValue, action: BagAction) => {
	switch (action.type) {
		case "ADD_TO_BAG": {
			const newState = {
				products: [
					...new Set([
						...state.products,
						{ id: action.productSkuId, quantity: action.quantity },
					]),
				],
			};
			saveToLocalStorage(newState);
			return newState;
		}
		case "REMOVE_FROM_BAG": {
			const removedState = {
				products: state.products.filter(
					(prod) => prod.id !== action.productSkuId,
				),
			};
			saveToLocalStorage(removedState);
			return removedState;
		}
		case "CLEAR_BAG": {
			const clearedState = { products: [] };
			saveToLocalStorage(clearedState);
			return clearedState;
		}
		case "INCREASE_QUANTITY": {
			const increasedState = {
				products: state.products.map((prod) =>
					prod.id === action.productSkuId
						? { ...prod, quantity: prod.quantity + 1 }
						: prod,
				),
			};
			saveToLocalStorage(increasedState);
			return increasedState;
		}
		case "DECREASE_QUANTITY": {
			const decreasedState = {
				products: state.products
					.map((prod) =>
						prod.id === action.productSkuId
							? { ...prod, quantity: prod.quantity - 1 }
							: prod,
					)
					.filter((prod) => prod.quantity > 0),
			};
			saveToLocalStorage(decreasedState);
			return decreasedState;
		}
		default:
			return state;
	}
};

export function BagProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = React.useReducer(reducer, initialState);

	return (
		<BagContext.Provider value={state}>
			<BagDispatchContext.Provider value={dispatch}>
				{children}
			</BagDispatchContext.Provider>
		</BagContext.Provider>
	);
}

export function useBag() {
	const context = React.useContext(BagContext);
	if (context === null) {
		throw new Error("useBag must be used within a BagProvider");
	}
	return context;
}

export function useBagDispatch() {
	const context = React.useContext(BagDispatchContext);
	if (context === null) {
		throw new Error("useBagDispatch must be used within a BagProvider");
	}
	return context;
}

export function useBagForProduct(productSkuId: number) {
	const { products } = useBag();

	const product = React.useMemo(
		() => products.find((prod) => prod.id === productSkuId),
		[products, productSkuId],
	);
	const isInBag = React.useMemo(() => product !== undefined, [product]);

	return {
		product,
		isInBag,
	};
}
