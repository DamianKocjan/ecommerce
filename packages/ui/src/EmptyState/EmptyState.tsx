import Image from "next/image";
import React from "react";
import { Flex } from "../Flex";

export interface EmptyStateProps {
	title: string;
	description: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
	title,
	description,
}) => {
	return (
		<Flex
			direction="col"
			items="center"
			justify="center"
			className="mt-6 text-center"
		>
			<Image src="/undraw_web_search_re_efla.svg" width="600" height="400" />
			<h3 className="text-4xl mt-6 mb-4 text-teal-400 font-bold">{title}</h3>
			<p className="text-xl text-neutral-800">{description}</p>
		</Flex>
	);
};
