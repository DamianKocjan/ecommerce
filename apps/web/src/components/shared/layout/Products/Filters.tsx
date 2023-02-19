import { FunnelSimple } from "phosphor-react";
import React from "react";

import { Flex } from "../../core/Flex";
import { BrandFilter } from "./Filter/Brand";
import { CollectionFilter } from "./Filter/Collection";
import { ColorFilter } from "./Filter/Color";
import { CutFilter } from "./Filter/Cut";
import { MaterialFilter } from "./Filter/Material";
import { FilterPanel, useFilterPanel } from "./Filter/Panel";
import { PatternFilter } from "./Filter/Pattern";
import { SizeFilter } from "./Filter/Size";
import { SortByFilter } from "./Filter/SortBy";

export const Filters: React.FC = () => {
	const { setOpen } = useFilterPanel();

	return (
		<Flex direction="row" wrap="wrap" className="gap-2">
			{/* <Filter /> */}
			<div className="flex-1" />
			<SortByFilter />
			<ColorFilter />
			<SizeFilter />
			<button
				className="focus-visible:ring-teal flex items-center justify-center gap-2 focus:outline-none focus-visible:border-teal-500 focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 sm:text-sm"
				type="button"
				onClick={() => setOpen(true)}
			>
				Filters
				<FunnelSimple className="h-5 w-5" aria-hidden="true" />
			</button>

			<FilterPanel>
				<BrandFilter />
				<CollectionFilter />
				<CutFilter />
				<MaterialFilter />
				<PatternFilter />
			</FilterPanel>
		</Flex>
	);
};
