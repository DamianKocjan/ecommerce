import type { Season } from "@ecommerce/prisma";
import create from "zustand";

export type Filters = keyof FilterState["filters"];
export type SortBy =
	| "popularity"
	| "priceLowToHigh"
	| "priceHighToLow"
	| "sales";

export interface FilterState {
	filters: {
		sortBy?: SortBy;
		sizes?: number[];
		brands?: number[];
		colors?: number[];
		price?: {
			min?: number;
			max?: number;
			onSaleRequired?: boolean | false;
		};
		materials?: number[];
		multipack?: boolean;
		patterns?: number[];
		cuts?: number[];
		collectionType?: number;
		season?: Season;
		delivery?: boolean;
	};
	setFilter<T = string>(key: Filters, value?: T): void;
	resetFilters(): void;
}

export const useFilter = create<FilterState>((set) => ({
	filters: {
		sortBy: "popularity",
	},
	setFilter: (key, value) =>
		set((state) => ({
			...state,
			filters: {
				...state.filters,
				[key]: value,
			},
		})),
	resetFilters: () =>
		set((state) => ({
			...state,
			filters: {},
		})),
}));
