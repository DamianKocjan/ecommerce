import { Combobox, Transition } from "@headlessui/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import React, { Fragment } from "react";

import { Spinner } from "~/components/shared/core/Spinner";
import { type RouterOutputs } from "~/utils/trpc";

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<div className="relative cursor-default select-none px-4 py-2 text-gray-700">
		{children}
	</div>
);

interface SearchProps {
	value: string;
	onChange: (search: string) => void;
	results?: RouterOutputs["dashboard"]["productSearch"];
	isLoading: boolean;
}

export const Search: React.FC<SearchProps> = ({
	value,
	onChange,
	results = [],
	isLoading,
}) => {
	return (
		<Combobox value={value} onChange={onChange}>
			<div className="relative mt-1">
				<div className="relative w-full cursor-default overflow-hidden border border-black bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
					<Combobox.Input
						className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
						displayValue={() => value}
						onChange={(event) => onChange(event.target.value)}
					/>
					<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
						<MagnifyingGlass
							className="h-5 w-5 text-gray-400"
							aria-hidden="true"
						/>
					</Combobox.Button>
				</div>
				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black focus:outline-none sm:text-sm">
						{value === "" ? (
							<Wrapper>Search for a product.</Wrapper>
						) : isLoading ? (
							<Wrapper>
								<Spinner />
							</Wrapper>
						) : results.length === 0 && value !== "" ? (
							<Wrapper>Nothing found.</Wrapper>
						) : (
							results.map((product) => (
								<Combobox.Option
									key={product.id}
									className={({ active }) =>
										`relative cursor-default select-none py-2 pl-10 pr-4 ${
											active ? "bg-black text-white" : "text-gray-900"
										}`
									}
									value={product.title}
								>
									<span className="block truncate font-normal">
										{product.title}
									</span>
								</Combobox.Option>
							))
						)}
					</Combobox.Options>
				</Transition>
			</div>
		</Combobox>
	);
};
