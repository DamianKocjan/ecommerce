import { useFilter } from "@/features/filter";
import { PrettyContainer } from "@ecommerce/ui";
import { SizeFilter } from "./Filter/Size";
import { SortByFilter } from "./Filter/SortBy";

export const Filters: React.FC = () => {
	const filter = useFilter();

	return (
		<PrettyContainer className="flex flex-row flex-wrap gap-2">
			{/* <Filter /> */}
			<SortByFilter />
			<SizeFilter />
		</PrettyContainer>
	);
};
