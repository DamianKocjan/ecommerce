"use client";

import React from "react";

import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { MultiRangeSlider } from "~/components/ui/multi-range-slider";
import { H3, Muted, Ul } from "~/components/ui/typography";
import {
	useUpdateFilter,
	type FilterValue,
	type FilterValues,
	type Filters as FiltersType,
} from "~/hooks/use-update-filter";
import { getFilters } from "~/server/products";
import type { AsyncReturnType, Maybe } from "~/utils/primitives";

type FiltersData = AsyncReturnType<typeof getFilters>;
type FilterValueData = FiltersData["filters"][number]["values"][number];

export function Filters({
	filters,
	filtersData,
}: {
	filters: FiltersType;
	filtersData: FiltersData;
}) {
	const {
		newFilters,
		handleFilterChange,
		handleCheckFilterChange,
		updateFilters,
		areFiltersEqual,
	} = useUpdateFilter(filters);

	return (
		<div className="hidden md:block">
			{filtersData.filters.map((filter) => (
				<div key={filter.id}>
					<H3>{filter.name}</H3>
					<Ul>
						{filter.values.map((value) => (
							<FilterValue
								key={`filter-${filter.id}-value-${value.id}`}
								value={value}
								filterId={filter.id}
								filterValue={newFilters[filter.id]}
								handleFilterChange={handleCheckFilterChange}
							/>
						))}
					</Ul>
				</div>
			))}

			<MultiRangeSlider
				min={filtersData.prices.min || 0}
				step={1}
				minStepsBetweenThumbs={0}
				value={[
					(newFilters["priceMin"] as Maybe<number>) ||
						filtersData.prices.min ||
						0,
					(newFilters["priceMax"] as Maybe<number>) ||
						filtersData.prices.max ||
						0,
				]}
				max={filtersData.prices.max || 0}
				onValueChange={(values) =>
					handleFilterChange({
						priceMin: values[0]!,
						priceMax: values[1]!,
					})
				}
			/>

			{areFiltersEqual ? null : (
				<Button className="mt-4 w-full" onClick={updateFilters}>
					Apply filters
				</Button>
			)}
		</div>
	);
}

function FilterValue({
	filterId,
	filterValue,
	value,
	handleFilterChange,
}: {
	filterId: number;
	filterValue: FilterValue | undefined;
	value: FilterValueData;
	handleFilterChange: ReturnType<
		typeof useUpdateFilter
	>["handleCheckFilterChange"];
}) {
	const isChecked = React.useMemo(
		() =>
			filterValue === value.id ||
			(Array.isArray(filterValue) &&
				(filterValue as FilterValues).includes(value.id)),
		[filterValue, value.id],
	);

	return (
		<li className="flex items-center space-x-2">
			<Checkbox
				checked={isChecked}
				onCheckedChange={(checked) =>
					handleFilterChange(checked, filterId, value.id)
				}
			/>
			<Label>{value.value} </Label>
			<Muted>({value._count.productVariants})</Muted>
		</li>
	);
}
