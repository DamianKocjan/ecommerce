import { PrettyContainer } from "@ecommerce/ui";
import { BrandFilter } from "./Filter/Brand";
import { CollectionFilter } from "./Filter/Collection";
import { ColorFilter } from "./Filter/Color";
import { CutFilter } from "./Filter/Cut";
import { MaterialFilter } from "./Filter/Material";
import { PatternFilter } from "./Filter/Pattern";
import { SizeFilter } from "./Filter/Size";
import { SortByFilter } from "./Filter/SortBy";

export const Filters: React.FC = () => {
	return (
		<PrettyContainer className="flex flex-row flex-wrap gap-2">
			{/* <Filter /> */}
			<SortByFilter />
			<SizeFilter />
			<BrandFilter />
			<ColorFilter />
			<CollectionFilter />
			<CutFilter />
			<MaterialFilter />
			<PatternFilter />
		</PrettyContainer>
	);
};
