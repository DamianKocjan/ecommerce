import { Dialog, Transition } from "@headlessui/react";
import { X } from "phosphor-react";
import { Fragment } from "react";
import create from "zustand";

import { Flex } from "../../../core/Flex";

interface Store {
	open: boolean;
	setOpen: (open: boolean) => void;
}

export const useFilterPanel = create<Store>((set) => ({
	open: false,
	setOpen: (open: boolean) => set({ open }),
}));

interface FilterPanelProps {
	children: React.ReactNode;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ children }) => {
	const open = useFilterPanel((state) => state.open);
	const setOpen = useFilterPanel((state) => state.setOpen);

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={setOpen}>
				<Transition.Child
					as={Fragment}
					enter="ease-in-out duration-500"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in-out duration-500"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-hidden">
					<div className="absolute inset-0 overflow-hidden">
						<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-500 sm:duration-700"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-500 sm:duration-700"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
									<Transition.Child
										as={Fragment}
										enter="ease-in-out duration-500"
										enterFrom="opacity-0"
										enterTo="opacity-100"
										leave="ease-in-out duration-500"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
											<button
												type="button"
												className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
												onClick={() => setOpen(false)}
											>
												<span className="sr-only">Close panel</span>
												<X className="h-6 w-6" aria-hidden="true" />
											</button>
										</div>
									</Transition.Child>
									<div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
										<div className="px-4 sm:px-6">
											<Dialog.Title className="text-lg font-medium text-gray-900">
												Filters
											</Dialog.Title>
										</div>
										<div className="relative mt-6 flex-1 px-4 sm:px-6">
											<Flex
												direction="col"
												className="absolute inset-0 gap-4 px-4 sm:px-6"
											>
												{children}
											</Flex>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};
