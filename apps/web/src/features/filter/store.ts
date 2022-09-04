import create from "zustand";

export type Filters = keyof FilterState["filters"];

export const SortBy = {
	popularity: "Popularity",
	priceLowToHigh: "Price low to high",
	priceHighToLow: "Price high to low",
	sales: "Sales",
} as const;

export const Seasons = {
	spring: "Spring",
	summer: "Summer",
	fall: "Fall",
	winter: "Winter",
	all: "All",
} as const;

export interface FilterState {
	filters: {
		sortBy?: keyof typeof SortBy;
		size?: string[];
		brand?: string[];
		color?: string[];
		price?: {
			min?: number;
			max?: number;
			onSaleRequired?: boolean | false;
		};
		material?: string[];
		multipack?: boolean;
		pattern?: string[];
		cut?: string[];
		collectionType?: string;
		season?: keyof typeof Seasons;
		delivery?: boolean;
		category?: string;
	};
	setFilter<T = string>(key: Filters, value?: T): void;
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
}));
