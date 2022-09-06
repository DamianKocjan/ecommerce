import { Listbox } from "@headlessui/react";
import { Check } from "phosphor-react";
import React from "react";

export interface FilterListboxOptionProps {
	value: string;
	label: string;
}

export const FilterListboxOption: React.FC<FilterListboxOptionProps> = ({
	value,
	label,
}) => {
	return (
		<Listbox.Option
			className={({ active }) =>
				`relative flex-grow cursor-default select-none py-2 pl-10 pr-6 ${
					active ? "bg-black text-white" : "text-gray-900"
				}`
			}
			value={value}
		>
			{({ selected }) => (
				<>
					<span
						className={`block truncate pr-3 ${
							selected ? "font-medium" : "font-normal"
						}`}
					>
						{label}
					</span>
					{selected ? (
						<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
							<Check className="h-5 w-5" aria-hidden="true" />
						</span>
					) : null}
				</>
			)}
		</Listbox.Option>
	);
};
