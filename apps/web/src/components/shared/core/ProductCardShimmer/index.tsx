import React from "react";

import { Flex } from "../Flex";

export const ProductCardShimmer: React.FC = () => {
	return (
		<Flex direction="col" className="animate-pulse space-y-2">
			<div className="relative h-64 w-full bg-black/25 before:absolute before:left-0.5 before:top-0.5 before:z-[-1] before:h-full before:w-full before:bg-teal-400/10 md:before:left-1 md:before:top-1" />
			<div className="h-4 w-1/5 bg-black/25" />
			<div className="h-8 w-5/6 bg-black/25" />
			<Flex items="center" className="w-full">
				<div className="h-5 w-1/3 bg-black/25" />
				<div className="flex-1" />
				<div className="h-10 w-10 bg-black/25" />
				<div className="ml-2 h-10 w-10 bg-black/25" />
			</Flex>
		</Flex>
	);
};
