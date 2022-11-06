import { Flex } from "@ecommerce/ui";
import { Listbox } from "@headlessui/react";
import { Check } from "phosphor-react";
import React from "react";

export const PER_PAGE = [6, 12, 24, 48];

export interface PerPageProps {
	onChange: (value: number) => void;
	value: number;
}

export const PerPage: React.FC<PerPageProps> = ({ onChange, value }) => {
	return (
		<Listbox value={value} onChange={onChange}>
			<div className="relative w-fit">
				<Listbox.Button className="relative sm:ml-2 cursor-default focus:outline-none focus-visible:border-teal-500 focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 sm:text-sm">
					<span className="cursor-pointer py-1 px-2 md:py-2 md:px-4 relative before:absolute before:z-[-1] md:before:top-1 md:before:left-1 before:top-0.5 before:left-0.5 before:w-full before:h-full text-white bg-black before:bg-teal-400">
						{value} per pag
					</span>
				</Listbox.Button>
				<Listbox.Options className="absolute mb-7 sm:left-2 bottom-0 max-h-60 bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20">
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
