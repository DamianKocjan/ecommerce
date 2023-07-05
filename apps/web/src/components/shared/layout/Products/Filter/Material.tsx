import { Combobox } from "@headlessui/react";
import { List } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { trpc } from "~/utils/trpc";
import { FilterComboboxOption } from "./Combobox/Option";
import { cacheTime } from "./constants";
import { useFilter } from "./store";

export const MaterialFilter: React.FC = () => {
	const materials = trpc.material.all.useQuery(undefined, {
		refetchOnWindowFocus: false,
		cacheTime,
	});
	const [query, setQuery] = useState("");
	const { filters, setFilter } = useFilter();
	const router = useRouter();

	const filteredMaterials = useMemo(
		() =>
			query === ""
				? materials.data
				: materials.data?.filter((material) =>
						material.value.toLowerCase().includes(query.toLowerCase()),
				  ),
		[materials.data, query],
	);

	const updateMaterialFilter = useCallback(
		(materials: number[]) => {
			setFilter("materials", materials);

			if (materials.length === 0) {
				const query = { ...router.query };
				delete query.materials;

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
						materials: `[${materials.join(".")}]`,
					},
				},
				undefined,
				{ shallow: true },
			);
		},
		[router, setFilter],
	);

	useEffect(() => {
		const materials = router.query["materials"] as string;
		if (materials && materials.includes("[") && materials.includes("]")) {
			setFilter(
				"materials",
				materials
					.slice(1, -1)
					.split(".")
					.map((b) => Number(b))
					.filter((b) => b !== 0),
			);
		}
	}, [router.query, setFilter]);

	const disabled =
		materials.isLoading || !materials.data || !materials.data.length;

	return (
		<Combobox
			as="div"
			value={filters.materials}
			onChange={updateMaterialFilter}
			disabled={disabled}
			multiple
		>
			<Combobox.Label className="block text-sm font-medium text-gray-700">
				Materials
			</Combobox.Label>
			<div className="relative mt-1">
				<Combobox.Input
					className="w-full border border-black bg-white py-2 pl-3 pr-10 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:cursor-not-allowed sm:text-sm"
					onChange={(event) => setQuery(event.target.value)}
					displayValue={(selected: number[]) =>
						selected
							?.map(
								(material) =>
									materials.data?.find((m) => m.key === material)?.value,
							)
							.join(", ") ?? ""
					}
				/>
				<Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none">
					<List className="h-5 w-5 text-gray-400" aria-hidden="true" />
				</Combobox.Button>

				{(filteredMaterials?.length ?? 0) > 0 && (
					<Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{filteredMaterials?.map((material) => (
							<FilterComboboxOption
								key={material.key}
								value={material.key}
								displayName={material.value}
							/>
						))}
					</Combobox.Options>
				)}
			</div>
		</Combobox>
	);
};
