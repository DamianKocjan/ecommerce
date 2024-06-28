"use client";

import React from "react";

import { Minus, Plus } from "@phosphor-icons/react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { Label } from "~/components/ui/label";
import { MultiRangeSlider } from "~/components/ui/multi-range-slider";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { H3, Muted, Small, Ul } from "~/components/ui/typography";
import {
	FiltersProvider,
	useFilters,
	type FilterValue,
	type FilterValues,
	type Filters as FiltersType,
} from "~/contexts/filters-context";
import { getFilters } from "~/server/products";
import type { AsyncReturnType, Maybe } from "~/utils/primitives";
import { SEASONS, SORT_OPTIONS } from "./constants";

type FiltersData = AsyncReturnType<typeof getFilters>;
type FilterValueData =
	| FiltersData["filters"][number]["values"][number]
	| FiltersData["manufacturers"][number];

export function Filters({
	filters,
	filtersData,
}: {
	filters: FiltersType;
	filtersData: FiltersData;
}) {
	return (
		<FiltersProvider filters={filters}>
			<div className="relative hidden gap-4 md:grid">
				<OrderByFilter />
				<Separator />

				<ManufacturersFilter manufacturers={filtersData.manufacturers} />
				<Separator />

				<SeasonFilter />
				<Separator />

				<PriceFilter
					min={filtersData.prices.min}
					max={filtersData.prices.max}
				/>
				<Separator />

				<DynamicFilters data={filtersData.filters} />

				<FilterUserActions />
			</div>
		</FiltersProvider>
	);
}

function FilterValue({
	filterId,
	value,
}: {
	filterId: number | string;
	value: FilterValueData;
}) {
	const { newFilters, handleCheckFilterChange } = useFilters();

	const filterValue = newFilters[filterId];

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
					handleCheckFilterChange(checked, filterId, value.id)
				}
			/>
			<Label>{"value" in value ? value.value : value.name} </Label>
			<Muted>
				(
				{"productVariants" in value._count
					? value._count.productVariants
					: value._count.products}
				)
			</Muted>
		</li>
	);
}

const MAX_VISIBLE_FILTERS = 5 as const;

function CollapsibleFilter({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	const [isOpen, setIsOpen] = React.useState(false);
	const [firstFive, rest] = React.useMemo(() => {
		const childrenArray = React.Children.toArray(children);

		return [
			childrenArray.slice(0, MAX_VISIBLE_FILTERS),
			childrenArray.slice(MAX_VISIBLE_FILTERS),
		];
	}, [children]);

	return (
		<Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
			<H3>{title}</H3>

			<Ul className="my-2">
				{firstFive}

				<CollapsibleContent asChild>
					<>{rest}</>
				</CollapsibleContent>

				{rest.length > 0 ? (
					<CollapsibleTrigger asChild>
						<li
							className="flex cursor-pointer items-center space-x-2"
							role="button"
						>
							{isOpen ? (
								<>
									<Minus className="h-4 w-4" />
									<Small>Show less</Small>
								</>
							) : (
								<>
									<Plus className="h-4 w-4" />
									<Small>Show more</Small>
									<Muted>({rest.length})</Muted>
								</>
							)}
						</li>
					</CollapsibleTrigger>
				) : null}
			</Ul>
		</Collapsible>
	);
}

function OrderByFilter() {
	const { newFilters, handleFilterChange } = useFilters();

	return (
		<div>
			<H3>Order by</H3>
			<Select
				value={(newFilters["sortBy"] as Maybe<string>) || "popularity"}
				onValueChange={(value) => handleFilterChange({ sortBy: value })}
			>
				<SelectTrigger className="my-2 w-full">
					<SelectValue placeholder="Order by" defaultValue="popularity" />
				</SelectTrigger>
				<SelectContent>
					{SORT_OPTIONS.map(([value, label]) => (
						<SelectItem key={`sort-by-option-${value}`} value={value}>
							{label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}

function ManufacturersFilter({
	manufacturers,
}: {
	manufacturers: FiltersData["manufacturers"];
}) {
	return (
		<CollapsibleFilter title="Manufacturers">
			{manufacturers.map((manufacturer) => (
				<FilterValue
					key={`manufacturer-option-${manufacturer.id}`}
					value={manufacturer}
					filterId="brands"
				/>
			))}
		</CollapsibleFilter>
	);
}

function SeasonFilter() {
	const { newFilters, handleFilterChange } = useFilters();

	return (
		<div>
			<H3>Season</H3>
			<Select
				value={(newFilters["season"] as Maybe<string>) || "ALL"}
				onValueChange={(value) => handleFilterChange({ season: value })}
			>
				<SelectTrigger className="my-2 w-full">
					<SelectValue placeholder="All" defaultValue="ALL" />
				</SelectTrigger>
				<SelectContent>
					{SEASONS.map(([value, label]) => (
						<SelectItem key={`season-option-${value}`} value={value}>
							{label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}

function PriceFilter({ min, max }: { min: Maybe<number>; max: Maybe<number> }) {
	const { newFilters, handleFilterChange } = useFilters();

	return (
		<div>
			<H3>Price</H3>

			<MultiRangeSlider
				min={min || 0}
				step={1}
				minStepsBetweenThumbs={0}
				value={[
					(newFilters["priceMin"] as Maybe<number>) || min || 0,
					(newFilters["priceMax"] as Maybe<number>) || max || 0,
				]}
				max={max || 0}
				onValueChange={(values) =>
					handleFilterChange({
						priceMin: values[0]!,
						priceMax: values[1]!,
					})
				}
				formatLabel={(value) => `${value}$`}
				className="mb-8 mt-4"
			/>
		</div>
	);
}

function DynamicFilters({ data }: { data: FiltersData["filters"] }) {
	const { areFiltersEqual, noFilters } = useFilters();

	return data.map((filter, index) => (
		<React.Fragment key={`filter-${filter.id}`}>
			<CollapsibleFilter title={filter.name}>
				{filter.values.map((value) => (
					<FilterValue
						key={`filter-${filter.id}-value-${value.id}`}
						value={value}
						filterId={filter.id}
					/>
				))}
			</CollapsibleFilter>

			{index !== data.length - 1 || !areFiltersEqual || !noFilters ? (
				<Separator />
			) : null}
		</React.Fragment>
	));
}

function FilterUserActions() {
	const { resetFilters, updateFilters, areFiltersEqual, noFilters } =
		useFilters();

	return (
		<>
			{areFiltersEqual ? null : (
				<Button
					className="absolute sticky bottom-2 left-0 mt-4 w-full"
					onClick={updateFilters}
				>
					Apply filters
				</Button>
			)}
			{noFilters ? null : (
				<Button variant="outline" className="w-full" onClick={resetFilters}>
					Reset filters
				</Button>
			)}
		</>
	);
}
