import { Categories } from "./Categories";
import { Search } from "./Search";

export const SubNav: React.FC = () => {
	return (
		<nav className="flex flex-row max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 justify-between mt-1">
			<Categories />
			<div>
				<Search />
			</div>
		</nav>
	);
};
