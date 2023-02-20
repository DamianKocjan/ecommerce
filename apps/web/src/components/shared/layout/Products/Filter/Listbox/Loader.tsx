import { Listbox } from "@headlessui/react";
import { SpinnerGap } from "phosphor-react";
import React from "react";

import { Flex } from "../../../../core/Flex";

export const FilterListboxOptionsLoader: React.FC = () => {
	return (
		<Listbox.Option
			disabled
			className="relative flex-grow cursor-default select-none py-2 pl-10 pr-6 text-gray-900"
			value="loading..."
		>
			<span className="block truncate pr-3 font-normal">Loading...</span>
			<Flex
				as="span"
				items="center"
				className="absolute inset-y-0 left-0 pl-3 text-teal-600"
			>
				<SpinnerGap
					className="h-5 w-5 motion-safe:animate-spin"
					aria-hidden="true"
				/>
			</Flex>
		</Listbox.Option>
	);
};
