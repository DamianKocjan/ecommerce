import { FunnelSimple } from "@phosphor-icons/react";
import dynamic from "next/dynamic";
import React from "react";

import { Flex } from "../../core/Flex";
import MediaQuery, { useMediaQuery } from "../../hooks/useMediaQuery";
import { CategoriesDesktopPanelProps } from "../Categories/DesktopPanel";
import { BrandFilter } from "./Filter/Brand";
import { CollectionFilter } from "./Filter/Collection";
import { ColorFilter } from "./Filter/Color";
import { CutFilter } from "./Filter/Cut";
import { MaterialFilter } from "./Filter/Material";
import { FilterPanel, useFilterPanel } from "./Filter/Panel";
import { PatternFilter } from "./Filter/Pattern";
import { SizeFilter } from "./Filter/Size";
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
}

export const Filters: React.FC<FiltersProps> = ({
	hideCategories,
	parentCategory,
	previousUrl,
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
					<ColorFilter />
					<SizeFilter />
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
					<Flex direction="row" justify="around">
						{/* FIXME: selection box is cut off */}
						<SortByFilter />
						<ColorFilter />
						<SizeFilter />
					</Flex>
				</MediaQuery>

				<BrandFilter />
				<CollectionFilter />
				<CutFilter />
				<MaterialFilter />
				<PatternFilter />
			</FilterPanel>
		</Flex>
	);
};
