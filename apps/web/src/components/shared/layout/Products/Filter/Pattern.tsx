import { Combobox } from "@headlessui/react";
import { useRouter } from "next/router";
import { List } from "phosphor-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useFilter } from "../../../../../features/filter";
import { trpc } from "../../../../../utils/trpc";
import { FilterComboboxOption } from "./Combobox/Option";

export const PatternFilter: React.FC = () => {
	const patterns = trpc.pattern.all.useQuery(undefined, {
		refetchOnWindowFocus: false,
	});
	const [query, setQuery] = useState("");
	const { filters, setFilter } = useFilter();
	const router = useRouter();

	const filteredPatterns = useMemo(
		() =>
			query === ""
				? patterns.data
				: patterns.data?.filter((pattern) =>
						pattern.value.toLowerCase().includes(query.toLowerCase()),
				  ),
		[patterns.data, query],
	);

	const updatePatternFilter = useCallback(
		(patterns: number[]) => {
			setFilter("patterns", patterns);

			if (patterns.length === 0) {
				const query = { ...router.query };
				delete query.patterns;

				void router.push(
					{
						query,
					},
					undefined,
					{ shallow: true },
				);
				return;
			}

			void router.push(
				{
					query: {
						...router.query,
						patterns: `[${patterns.join(".")}]`,
					},
				},
				undefined,
				{ shallow: true },
			);
		},
		[router, setFilter],
	);

	useEffect(() => {
		const patterns = router.query["patterns"] as string;
		if (patterns && patterns.includes("[") && patterns.includes("]")) {
			setFilter(
				"patterns",
				patterns
					.slice(1, -1)
					.split(".")
					.map((b) => Number(b))
					.filter((b) => b !== 0),
			);
		}
	}, [router.query, setFilter]);

	const disabled =
		patterns.isLoading || !patterns.data || !patterns.data.length;

	return (
		<Combobox
			as="div"
			value={filters.patterns}
			onChange={updatePatternFilter}
			disabled={disabled}
			multiple
		>
			<Combobox.Label className="block text-sm font-medium text-gray-700">
				Patterns
			</Combobox.Label>
			<div className="relative mt-1">
				<Combobox.Input
					className="w-full border border-black bg-white py-2 pl-3 pr-10 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:cursor-not-allowed sm:text-sm"
					onChange={(event) => setQuery(event.target.value)}
					displayValue={(selected: number[]) =>
						selected
							?.map(
								(pattern) =>
									patterns.data?.find((p) => p.key === pattern)?.value,
							)
							.join(", ") ?? ""
					}
				/>
				<Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none">
					<List className="h-5 w-5 text-gray-400" aria-hidden="true" />
				</Combobox.Button>

				{(filteredPatterns?.length ?? 0) > 0 && (
					<Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{filteredPatterns?.map((pattern) => (
							<FilterComboboxOption
								key={pattern.key}
								value={pattern.key}
								displayName={pattern.value}
							/>
						))}
					</Combobox.Options>
				)}
			</div>
		</Combobox>
	);
};
