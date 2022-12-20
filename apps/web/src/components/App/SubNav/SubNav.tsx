import { Flex } from "@ecommerce/ui";
import { Categories } from "./Categories";
import { Search } from "./Search";

export const SubNav: React.FC = () => {
	return (
		<Flex
			as="nav"
			direction="row"
			justify="between"
			className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mt-1"
		>
			<Categories />
			<Search />
		</Flex>
	);
};
