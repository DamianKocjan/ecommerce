import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";

import { useFilter } from "../../../../../features/filter";
import { trpc } from "../../../../../utils/trpc";
import {
	FilterListbox,
	FilterListBoxButton,
	FilterListboxOption,
	FilterListboxOptions,
	FilterListboxOptionsLoader,
} from "./Listbox";

export const CutFilter: React.FC = () => {
	const cuts = trpc.cut.all.useQuery(undefined, {
		refetchOnWindowFocus: false,
	});
	const { filters, setFilter } = useFilter();
	const router = useRouter();

	// TODO: type this
	const handleChange = useCallback(
		(val: unknown) => {
			setFilter("cuts", val);

			if ((val as string[]).length === 0) {
				const query = { ...router.query };
				delete query.cuts;

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
						cuts: `[${(val as string[]).join(".")}]`,
					},
				},
				undefined,
				{ shallow: true },
			);
		},
		[setFilter, router],
	);

	useEffect(() => {
		const cuts = router.query["cuts"] as string;
		if (cuts && cuts.includes("[") && cuts.includes("]")) {
			setFilter(
				"cuts",
				cuts
					.slice(1, -1)
					.split(".")
					.map((c) => Number(c))
					.filter((c) => c !== 0),
			);
		}
	}, [router.query, setFilter]);

	return (
		<FilterListbox onChange={handleChange} value={filters?.cuts || []} multiple>
			<FilterListBoxButton label="Cut" />
			<FilterListboxOptions>
				{cuts.isLoading ? (
					<FilterListboxOptionsLoader />
				) : (
					cuts.data?.map((cut) => (
						<FilterListboxOption
							key={cut.key}
							label={cut.value}
							value={cut.key}
						/>
					))
				)}
			</FilterListboxOptions>
		</FilterListbox>
	);
};
