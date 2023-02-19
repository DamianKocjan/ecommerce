import { Listbox } from "@headlessui/react";
import React from "react";

import { Flex } from "../../../../core/Flex";

export interface FilterListboxOptionsProps {
	children: React.ReactNode;
}

export const FilterListboxOptions: React.FC<FilterListboxOptionsProps> = ({
	children,
}) => {
	return (
		<Listbox.Options
			as={Flex}
			direction="col"
			className="absolute top-full -left-1/2 z-20 mt-1 max-h-60 overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
		>
			{children}
		</Listbox.Options>
	);
};
