import { Listbox } from "@headlessui/react";
import { CaretDown } from "@phosphor-icons/react";
import React from "react";

import { Flex } from "../../../../core/Flex";

export interface FilterListboxButtonProps {
	label: string;
	selectedOptionText?: string;
}

export const FilterListboxButton: React.FC<FilterListboxButtonProps> = ({
	label,
	selectedOptionText,
}) => {
	return (
		<Listbox.Button className="focus-visible:ring-teal relative w-full cursor-pointer py-2 pl-3 pr-4 text-left focus:outline-none focus-visible:border-teal-500 focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 sm:text-sm">
			<span className="mr-4 block cursor-pointer truncate">
				{label}
				{selectedOptionText}
			</span>
			<Flex
				as="span"
				items="center"
				className="pointer-events-none absolute inset-y-0 right-0 pr-1"
			>
				<CaretDown className="h-5 w-5" aria-hidden="true" />
			</Flex>
		</Listbox.Button>
	);
};
