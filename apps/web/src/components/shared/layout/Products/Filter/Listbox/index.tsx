import { Listbox } from "@headlessui/react";
import React from "react";

import { FilterListboxButton } from "./Button";
import { FilterListboxOptionsLoader } from "./Loader";
import { FilterListboxOption } from "./Option";
import { FilterListboxOptions } from "./Options";

// TODO: generics type for value and onChange
export interface FilterListboxProps {
	value: unknown;
	onChange: (value: unknown) => void;
	multiple?: boolean;
	children: React.ReactNode;
}

export type FilterListbox = React.FC<FilterListboxProps> & {
	Button: typeof FilterListboxButton;
	Options: typeof FilterListboxOptions;
	Option: typeof FilterListboxOption;
	OptionsLoader: typeof FilterListboxOptionsLoader;
};

export const FilterListbox: FilterListbox = ({
	value,
	onChange,
	multiple,
	children,
}) => {
	return (
		<Listbox value={value} onChange={onChange} multiple={multiple}>
			<div className="relative flex w-fit items-center justify-center">
				{children}
			</div>
		</Listbox>
	);
};

FilterListbox.Button = FilterListboxButton;
FilterListbox.Options = FilterListboxOptions;
FilterListbox.Option = FilterListboxOption;
FilterListbox.OptionsLoader = FilterListboxOptionsLoader;
