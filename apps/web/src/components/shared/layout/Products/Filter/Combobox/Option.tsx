import { Combobox } from "@headlessui/react";
import { Check } from "@phosphor-icons/react";
import React from "react";

import { Flex } from "../../../../core/Flex";
import { classNames } from "../../../../utils/classnames";

interface FilterComboboxOptionsProps {
	value: unknown;
	displayName: string;
}

export const FilterComboboxOption: React.FC<FilterComboboxOptionsProps> = ({
	displayName,
	value,
}) => {
	return (
		<Combobox.Option
			value={value}
			className={({ active }) =>
				classNames(
					"relative cursor-default select-none py-2 pl-8 pr-4",
					active ? "bg-black text-white" : "text-gray-900",
				)
			}
		>
			{({ active, selected }) => (
				<>
					<span
						className={classNames(
							"block truncate",
							selected ? "font-semibold" : "",
						)}
					>
						{displayName}
					</span>

					{selected && (
						<Flex
							as="span"
							items="center"
							className={classNames(
								"absolute inset-y-0 left-0 pl-1.5",
								active ? "text-white" : "text-teal-600",
							)}
						>
							<Check className="h-5 w-5" aria-hidden="true" />
						</Flex>
					)}
				</>
			)}
		</Combobox.Option>
	);
};
