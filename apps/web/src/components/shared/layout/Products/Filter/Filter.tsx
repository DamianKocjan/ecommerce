import { Combobox } from "@headlessui/react";
import { List } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import React, { useCallback, useMemo, useState } from "react";

import { RouterOutputs } from "~/utils/trpc";
import { FilterComboboxOption } from "./Combobox/Option";

export interface FilterProps {
	name: string;
	id: number;
	options: RouterOutputs["filters"]["products"]["filters"][number]["values"];
}

export const Filter: React.FC<FilterProps> = ({ name, id, options }) => {
	const [query, setQuery] = useState("");
	const router = useRouter();

	const filteredOptions = useMemo(
		() =>
			query === ""
				? options.toSorted((aOption, bOption) =>
						aOption._count.products > bOption._count.products ? -1 : 1,
				  )
				: options
						.filter((option) =>
							option.value.toLowerCase().includes(query.toLowerCase()),
						)
						.toSorted((aOption, bOption) =>
							aOption._count.products > bOption._count.products ? -1 : 1,
						),
		[options, query],
	);

	const selectedOptions = useMemo(
		() =>
			router.query[id]
				? (router.query[id] as string).slice(1, -1).split(".").map(Number)
				: [],
		[router, id],
	);

	const updateFilter = useCallback(
		(opts: number[]) => {
			if (opts.length === 0) {
				const query = { ...router.query };
				delete query[id];

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
						[id]: `[${opts.join(".")}]`,
					},
				},
				undefined,
				{ shallow: true },
			);
		},
		[router],
	);

	return (
		<Combobox as="div" value={selectedOptions} onChange={updateFilter} multiple>
			<Combobox.Label className="block text-sm font-medium text-gray-700">
				{name}
			</Combobox.Label>
			<div className="relative mt-1">
				<Combobox.Input
					className="w-full border border-black bg-white py-2 pl-3 pr-10 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:cursor-not-allowed sm:text-sm"
					onChange={(event) => setQuery(event.target.value)}
					displayValue={(selected: number[]) =>
						selected
							.map(
								(selectedOptionId) =>
									options.find((option) => option.id === selectedOptionId)
										?.value,
							)
							.join(", ")
					}
				/>
				<Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none">
					<List className="h-5 w-5 text-gray-400" aria-hidden="true" />
				</Combobox.Button>

				{filteredOptions.length > 0 && (
					<Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{filteredOptions.map((option) => (
							<FilterComboboxOption
								key={option.id}
								value={option.id}
								displayName={`${option.value} (${option._count.products})`}
							/>
						))}
					</Combobox.Options>
				)}
			</div>
		</Combobox>
	);
};
