import { Listbox } from "@headlessui/react";
import { Check } from "@phosphor-icons/react";
import React from "react";

import { Flex } from "~/components/shared/core/Flex";

export const PER_PAGE = [6, 12, 24, 48] as const;

export interface PerPageProps {
	onChange: (value: number) => void;
	value: number;
}

export const PerPage: React.FC<PerPageProps> = ({ onChange, value }) => {
	return (
		<Listbox value={value} onChange={onChange}>
			<div className="relative w-fit">
				<Listbox.Button className="focus-visible:ring-teal relative cursor-default focus:outline-none focus-visible:border-teal-500 focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 sm:ml-2 sm:text-sm">
					<span className="relative cursor-pointer bg-black px-2 py-1 text-white before:absolute before:left-0.5 before:top-0.5 before:z-[-1] before:h-full before:w-full before:bg-teal-400 md:px-4 md:py-2 md:before:left-1 md:before:top-1">
						{value} per page
					</span>
				</Listbox.Button>
				<Listbox.Options className="absolute bottom-0 z-20 mb-7 max-h-60 bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:left-2 sm:text-sm">
					{PER_PAGE.map((option) => (
						<Listbox.Option
							key={option}
							className={({ active }) =>
								`relative cursor-default select-none py-2 pl-10 pr-2 ${
									active ? "bg-black text-white" : "text-gray-900"
								}`
							}
							value={option}
						>
							{({ selected }) => (
								<>
									<span
										className={`block truncate pr-3 ${
											selected ? "font-medium" : "font-normal"
										}`}
									>
										{option}
									</span>
									{selected ? (
										<Flex
											as="span"
											items="center"
											className="absolute inset-y-0 left-0 pl-3 text-teal-600"
										>
											<Check className="h-5 w-5" aria-hidden="true" />
										</Flex>
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
