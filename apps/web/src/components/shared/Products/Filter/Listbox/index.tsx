import { Listbox } from "@headlessui/react";
import React from "react";

// TODO: generics type for value and onChange
export interface FilterListboxProps {
	value: unknown;
	onChange: (value: unknown) => void;
	multiple?: boolean;
	children: React.ReactNode;
}

export const FilterListbox: React.FC<FilterListboxProps> = ({
	value,
	onChange,
	multiple,
	children,
}) => {
	return (
		<Listbox value={value} onChange={onChange} multiple={multiple}>
			<div className="relative w-fit">{children}</div>
		</Listbox>
	);
};

export * from "./Button";
export * from "./Loader";
export * from "./Option";
export * from "./Options";
