import type { CheckedState } from "@radix-ui/react-checkbox";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
	cleanUpObject,
	combineObjects,
	deepCompare,
	isNothing,
	removeKeys,
	stringifyValue,
	type Arrayish,
} from "~/utils/primitives";

export type FilterValue = Arrayish<string | number | boolean>;
export type FilterValues = (string | number | boolean)[];

export type Filters = Readonly<Record<string | number, FilterValue>>;

const IGNORED_FILTERS = ["page", "perPage"];

type FiltersValue = {
	// State
	newFilters: Filters;
	areFiltersEqual: boolean;
	noFilters: boolean;

	// Actions that change the oldFilters
	resetFilters: () => void;
	updateFilters: () => void;

	// Actions that change the newFilters
	handleFilterChange: (values: Record<string, FilterValue>) => void;
	handleCheckFilterChange: (
		checked: CheckedState,
		filterId: number | string,
		valueId: number,
	) => void;
};

const FiltersContext = React.createContext<FiltersValue | null>(null);
FiltersContext.displayName = "FiltersContext";

export function FiltersProvider({
	children,
	filters,
}: {
	children: React.ReactNode;
	filters: Filters;
}) {
	const [newFilters, setNewFilters] = React.useState(filters);
	const router = useRouter();
	const path = usePathname();

	const areFiltersEqual = React.useMemo(
		() =>
			deepCompare(
				removeKeys(filters, IGNORED_FILTERS),
				removeKeys(cleanUpObject(newFilters), IGNORED_FILTERS),
			),
		[filters, newFilters],
	);
	const noFilters = React.useMemo(
		() =>
			Object.keys(newFilters).length === 0 ||
			Object.keys(newFilters)
				.filter((filter) => !IGNORED_FILTERS.includes(filter))
				.every((key) => isNothing(newFilters[key])),
		[newFilters],
	);

	const resetFilters = React.useCallback(() => {
		router.replace(path);
		setNewFilters({});
	}, [path, router]);

	const handleFilterChange = React.useCallback(
		(values: Record<string, FilterValue>) => {
			setNewFilters((oldFilters) => combineObjects(oldFilters, values));
		},
		[],
	);

	const updateFilters = React.useCallback(() => {
		if (noFilters) {
			return resetFilters();
		}

		const searchParams = new Map<string, string>();

		// 1. Fill map with old filters
		for (const [key, value] of Object.entries(filters)) {
			searchParams.set(key, stringifyValue(value));
		}

		// 2. Fill map with new filters with comparison
		for (const [key, value] of Object.entries(newFilters)) {
			if (isNothing(value)) {
				searchParams.delete(key);
				continue;
			}

			searchParams.set(key, stringifyValue(value));
		}

		// 3. Convert map to array of query params and replace the route
		const searchParamsArray = [];
		for (const [key, value] of searchParams) {
			searchParamsArray.push(`${key}=${value}`);
		}

		router.replace(`${path}?${searchParamsArray.join("&")}`);
	}, [filters, newFilters, noFilters, path, resetFilters, router]);

	const handleCheckFilterChange = React.useCallback(
		(checked: CheckedState, filterId: number | string, valueId: number) => {
			const filterValues = new Set(
				(newFilters[filterId] as FilterValues) || [],
			);

			if (checked === true) {
				filterValues.add(valueId);
			} else {
				filterValues.delete(valueId);
			}

			setNewFilters((oldFilters) =>
				Object.assign({}, oldFilters, {
					[filterId]: Array.from(filterValues),
				}),
			);
		},
		[newFilters],
	);

	return (
		<FiltersContext.Provider
			value={{
				newFilters,
				areFiltersEqual,
				noFilters,
				resetFilters,
				updateFilters,
				handleFilterChange,
				handleCheckFilterChange,
			}}
		>
			{children}
		</FiltersContext.Provider>
	);
}

export function useFilters() {
	const context = React.useContext(FiltersContext);
	if (context === null) {
		throw new Error("useFilters must be used within a FiltersProvider");
	}
	return context;
}
