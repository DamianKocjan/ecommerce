import type { CheckedState } from "@radix-ui/react-checkbox";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import {
	combineObjects,
	deepCompare,
	isNothing,
	stringifyValue,
	type Arrayish,
} from "~/utils/primitives";

export type FilterValue = Arrayish<string | number | boolean>;
export type FilterValues = (string | number | boolean)[];

export type Filters = Readonly<Record<string | number, FilterValue>>;

export function useUpdateFilter(filters: Filters) {
	const [newFilters, setNewFilters] = React.useState(filters);
	const router = useRouter();
	const path = usePathname();

	const updateFilters = React.useCallback(() => {
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
	}, [filters, newFilters, path, router]);

	const handleCheckFilterChange = React.useCallback(
		(checked: CheckedState, filterId: number, valueId: number) => {
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

	const handleFilterChange = React.useCallback(
		(values: Record<string, FilterValue>) => {
			setNewFilters((oldFilters) => combineObjects(oldFilters, values));
		},
		[],
	);

	const areFiltersEqual = React.useMemo(
		() => deepCompare(filters, newFilters),
		[filters, newFilters],
	);

	return {
		newFilters,
		handleFilterChange,
		handleCheckFilterChange,
		updateFilters,
		areFiltersEqual,
	};
}
