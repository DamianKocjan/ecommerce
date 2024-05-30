import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { H3, Muted, Ul } from "~/components/ui/typography";
import { getFilters } from "~/server/products";
import { stringifyValue, type Arrayish } from "~/utils/primitives";
import { Slider } from "./slider";

type FilterValue = Arrayish<string | number | boolean>;

export async function Filters({
	categorySlug,
	filters,
}: {
	categorySlug: string;
	filters: Record<string | number, FilterValue>;
}) {
	const data = await getFilters(categorySlug);

	const router = useRouter();
	const path = usePathname();

	const filtersCopy = structuredClone(filters);

	// FIXME: URL search params jump around when filters are updated.
	// e.g. filters with ids `1` and `2` are placed like `?2=[2]&1=[1]` in the URL
	// and when the filter with id `1` is updated, it becomes `?1=[1,3]&2=[2]`
	// so it's jumping around in the URL. Slightly annoying but not a big deal.
	const updateFilters = React.useCallback(
		(values: Record<string, FilterValue>) => {
			const searchParams = new Map();
			Object.keys(filters).forEach((key) => {
				searchParams.set(key, stringifyValue(filters[key]!));
			});

			Object.keys(values).forEach((key) => {
				if (
					values[key] === undefined ||
					values[key] === null ||
					(Array.isArray(values[key]) &&
						!(values[key] as (string | number | boolean)[])?.length)
				) {
					searchParams.delete(key);
					return;
				}

				searchParams.set(key, stringifyValue(values[key]!));
			});

			const searchParamsArray = [];
			for (const [key, value] of searchParams) {
				searchParamsArray.push(`${key}=${value}`);
			}

			router.replace(`${path}?${searchParamsArray.join("&")}`);
		},
		[filters, path, router],
	);

	const handleFilterChange = React.useCallback(
		(checked: string | boolean, filterId: number, valueId: number) => {
			const filterValues = new Set(
				(filters[filterId] as (string | number | boolean)[]) || [],
			);

			if (checked === true || checked === "true") {
				filterValues.add(valueId);
			} else {
				filterValues.delete(valueId);
			}

			updateFilters({
				[filterId]: [...filterValues],
			});
		},
		[filters, updateFilters],
	);

	return (
		<div>
			{data.filters.map((filter) => (
				<div key={filter.id}>
					<H3>{filter.name}</H3>
					<Ul>
						{filter.values.map((value) => {
							const isChecked =
								filters[filter.id] === value.id ||
								(Array.isArray(filters[filter.id]) &&
									(
										filters[filter.id] as (string | number | boolean)[]
									).includes(value.id));

							return (
								<li key={value.id} className="flex items-center space-x-2">
									<Checkbox
										checked={isChecked}
										onCheckedChange={(checked) =>
											handleFilterChange(checked, filter.id, value.id)
										}
									/>
									<label
										htmlFor="terms"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										{value.value}{" "}
									</label>
									<Muted>({value._count.productVariants})</Muted>
								</li>
							);
						})}
					</Ul>
				</div>
			))}

			<Slider
				min={data.prices.min || 0}
				step={1}
				minStepsBetweenThumbs={0}
				value={[
					(filtersCopy["priceMin"] as number | undefined) ||
						data.prices.min ||
						0,
					(filtersCopy["priceMax"] as number | undefined) ||
						data.prices.max ||
						0,
				]}
				max={data.prices.max || 0}
				// FIXME: maybe we should use a debounce here or show button to apply the filter instead of updating on every change
				onValueChange={(values) =>
					updateFilters({
						priceMin: values[0]!,
						priceMax: values[1]!,
					})
				}
			/>
		</div>
	);
}
