import { FunnelSimple } from "@phosphor-icons/react";
import dynamic from "next/dynamic";
import React from "react";

import { Flex } from "~/components/shared/core/Flex";
import MediaQuery, {
	useMediaQuery,
} from "~/components/shared/hooks/useMediaQuery";
import { RouterOutputs } from "~/utils/trpc";
import { CategoriesDesktopPanelProps } from "../Categories/DesktopPanel";
import { BrandFilter } from "./Filter/Brand";
import { Filter } from "./Filter/Filter";
import { FilterPanel, useFilterPanel } from "./Filter/Panel";
import { SeasonFilter } from "./Filter/Season";
import { SortByFilter } from "./Filter/SortBy";

const CategoriesDesktopPanel = dynamic(
	() =>
		import("../Categories/DesktopPanel").then(
			(mod) => mod.CategoriesDesktopPanel,
		),
	{
		ssr: false,
	},
);

export interface FiltersProps extends CategoriesDesktopPanelProps {
	hideCategories?: boolean;
	filters?: RouterOutputs["filters"]["products"];
}

export const Filters: React.FC<FiltersProps> = ({
	hideCategories,
	parentCategory,
	previousUrl,
	filters,
}) => {
	const { setOpen } = useFilterPanel();

	const isSmallerThanMediumScreen = useMediaQuery("sm", true);
	const isMediumScreen = useMediaQuery("sm");

	return (
		<Flex direction="row" wrap="wrap" className="gap-2">
			{isSmallerThanMediumScreen && !hideCategories && (
				<CategoriesDesktopPanel
					parentCategory={parentCategory}
					previousUrl={previousUrl}
				/>
			)}

			<div className="flex-1" />

			{isMediumScreen && (
				<>
					<SortByFilter />
				</>
			)}

			<button
				className="focus-visible:ring-teal flex items-center justify-center gap-2 focus:outline-none focus-visible:border-teal-500 focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 sm:text-sm"
				type="button"
				onClick={() => setOpen(true)}
			>
				Filters
				<FunnelSimple className="h-5 w-5" aria-hidden="true" />
			</button>

			<FilterPanel>
				<MediaQuery max="xs">
					<SortByFilter />
				</MediaQuery>

				<SeasonFilter />
				<BrandFilter />

				{filters?.filters.map((filter) => (
					<Filter
						key={filter.id}
						name={filter.name}
						id={filter.id}
						options={filter.values}
					/>
				))}

				<p>{filters?.prices._min.price}</p>
				<p>{filters?.prices._max.price}</p>
			</FilterPanel>
		</Flex>
	);
};
