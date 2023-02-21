import type { Season } from "@ecommerce/db";
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
		priceMin?: number;
		priceMax?: number;
		onSaleRequired?: boolean;
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
		set((prev) => ({
			filters: {
				...prev.filters,
				[key]: value,
			},
		})),
	resetFilters: () =>
		set(() => ({
			filters: {
				sortBy: "popularity",
			},
		})),
}));
