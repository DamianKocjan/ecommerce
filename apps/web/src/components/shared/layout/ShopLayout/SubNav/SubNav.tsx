import React from "react";

import { Flex } from "../../../core/Flex";
import { Categories } from "./Categories";
import { Search } from "./Search";

export const SubNav: React.FC = () => {
	return (
		<Flex
			as="nav"
			direction="row"
			justify="between"
			className="mx-auto mt-1 max-w-7xl px-2 sm:px-6 lg:px-8"
		>
			<Categories />
			<Search />
		</Flex>
	);
};
