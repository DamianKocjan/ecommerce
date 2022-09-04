import { Filters, useFilter } from "@/features/filter";
import { Listbox } from "@headlessui/react";
import { Check, FunnelSimple } from "phosphor-react";
import { useCallback, useMemo } from "react";

export interface Option {
	key: string;
	value: string;
}

export interface FilterProps {
	label: string;
	filterKey: Filters;
	options: Option[];
	selected: string[];
	multiSelect?: boolean;
	showSelectedOption?: boolean;
}

// FIXME: selecting with multiSelect doesn't work
export const Filter: React.FC<FilterProps> = ({
	label,
	filterKey,
	options,
	selected,
	multiSelect,
	showSelectedOption,
}) => {
	const filter = useFilter();
	const value = useMemo(
		() => (filter.filters[filterKey] || multiSelect ? selected : selected[0]),
		[filter.filters]
	);

	const selectedOptionText = useMemo(
		() =>
			showSelectedOption
				? ` - ${
						multiSelect
							? options.filter((option) => value.includes(option.key)).join(" ")
							: options.find((option) => option.key === value[0])?.value
				  }`
				: "",
		[value, showSelectedOption]
	);

	const handleChange = useCallback(
		(v: string | string[]) => {
			// console.log({ filterKey, multiSelect, value, v });

			const newValue = multiSelect ? [...new Set([...value, v])] : v;

			filter.setFilter(filterKey, newValue);
		},
		[filter, filterKey, multiSelect, value]
	);

	return (
		<Listbox
			value={Array.isArray(value) ? value[0] : value}
			onChange={handleChange}
			multiple={multiSelect}
		>
			<div className="relative w-fit">
				<Listbox.Button className="relative w-full cursor-default py-2 pl-3 pr-4 text-left focus:outline-none focus-visible:border-teal-500 focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 sm:text-sm">
					<span className="block truncate mr-4 cursor-pointer">
						{label}
						{selectedOptionText}
					</span>
					<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1">
						<FunnelSimple className="h-5 w-5 text-white" aria-hidden="true" />
					</span>
				</Listbox.Button>
				<Listbox.Options className="absolute mt-1 max-h-60 overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20">
					{options.map((option, i) => (
						<Listbox.Option
							key={`${option.key}-${i}`}
							className={({ active }) =>
								`relative cursor-default select-none py-2 pl-10 pr-6 ${
									active ? "bg-black text-white" : "text-gray-900"
								}`
							}
							value={option.key}
						>
							{({ selected }) => (
								<>
									<span
										className={`block truncate pr-3 ${
											selected ? "font-medium" : "font-normal"
										}`}
									>
										{option.value}
									</span>
									{selected ? (
										<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
											<Check className="h-5 w-5" aria-hidden="true" />
										</span>
									) : null}
								</>
							)}
						</Listbox.Option>
					))}
				</Listbox.Options>
			</div>
		</Listbox>
	);
};
