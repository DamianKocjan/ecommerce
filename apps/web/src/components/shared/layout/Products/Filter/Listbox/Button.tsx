import { Listbox } from "@headlessui/react";
import { FunnelSimple } from "phosphor-react";
import React from "react";

import { Flex } from "../../../../core/Flex";

export interface FilterListBoxButtonProps {
	label: string;
	selectedOptionText?: string;
}

export const FilterListBoxButton: React.FC<FilterListBoxButtonProps> = ({
	label,
	selectedOptionText,
}) => {
	return (
		<Listbox.Button className="focus-visible:ring-teal relative w-full cursor-default py-2 pl-3 pr-4 text-left focus:outline-none focus-visible:border-teal-500 focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 sm:text-sm">
			<span className="mr-4 block cursor-pointer truncate">
				{label}
				{selectedOptionText}
			</span>
			<Flex
				as="span"
				items="center"
				className="pointer-events-none absolute inset-y-0 right-0 pr-1"
			>
				<FunnelSimple className="h-5 w-5 text-white" aria-hidden="true" />
			</Flex>
		</Listbox.Button>
	);
};
