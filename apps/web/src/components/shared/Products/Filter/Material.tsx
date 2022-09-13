import { useFilter } from "@/features/filter";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import {
	FilterListbox,
	FilterListBoxButton,
	FilterListboxOption,
	FilterListboxOptions,
	FilterListboxOptionsLoader,
} from "./Listbox";

export const MaterialFilter: React.FC = () => {
	const materials = trpc.useQuery(["materials"], {
		refetchOnWindowFocus: false,
	});
	const { filters, setFilter } = useFilter();
	const router = useRouter();

	// TODO: type this
	const handleChange = useCallback(
		(val: unknown) => {
			setFilter("materials", val);

			if ((val as string[]).length === 0) {
				const query = { ...router.query };
				delete query.materials;

				router.push(
					{
						query,
					},
					undefined,
					{ shallow: true }
				);
				return;
			}

			router.push(
				{
					query: {
						...router.query,
						materials: `[${(val as string[]).join(".")}]`,
					},
				},
				undefined,
				{ shallow: true }
			);
		},
		[setFilter, router]
	);

	useEffect(() => {
		const materials = router.query["materials"] as string;
		if (materials && materials.includes("[") && materials.includes("]")) {
			setFilter(
				"materials",
				materials
					.slice(1, -1)
					.split(".")
					.map((m) => Number(m))
					.filter((m) => m !== 0)
			);
		}
	}, [router.query]);

	return (
		<FilterListbox
			onChange={handleChange}
			value={filters?.materials || []}
			multiple
		>
			<FilterListBoxButton label="Material" />
			<FilterListboxOptions>
				{materials.isLoading ? (
					<FilterListboxOptionsLoader />
				) : (
					materials.data?.map((material) => (
						<FilterListboxOption
							key={material.key}
							label={material.value}
							value={material.key}
						/>
					))
				)}
			</FilterListboxOptions>
		</FilterListbox>
	);
};
