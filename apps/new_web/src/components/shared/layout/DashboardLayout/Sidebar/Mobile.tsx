import { Dialog, Transition } from "@headlessui/react";
import { X } from "@phosphor-icons/react";
import React, { Fragment } from "react";

import { Flex } from "~/components/shared/core/Flex";
import { navigation } from "../constants";
import { MenuItem } from "./MenuItem";
import { useSidebar } from "./store";

export const SidebarMobile: React.FC = () => {
	const isSidebarOpen = useSidebar((state) => state.isOpen);
	const closeSidebar = useSidebar((state) => state.close);

	return (
		<Transition.Root show={isSidebarOpen} as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 z-40 flex md:hidden"
				onClose={closeSidebar}
			>
				<Transition.Child
					as={Fragment}
					enter="transition-opacity ease-linear duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity ease-linear duration-300"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
				</Transition.Child>
				<Transition.Child
					as={Fragment}
					enter="transition ease-in-out duration-300 transform"
					enterFrom="-translate-x-full"
					enterTo="translate-x-0"
					leave="transition ease-in-out duration-300 transform"
					leaveFrom="translate-x-0"
					leaveTo="-translate-x-full"
				>
					<Flex
						direction="col"
						className="relative w-full max-w-xs flex-1 bg-white pb-4 pt-5"
					>
						<Flex
							items="center"
							justify="between"
							className="flex-shrink-0 px-4"
						>
							<h1 className="h-8 font-mono text-3xl">Ecommerce</h1>

							<button
								type="button"
								className="flex h-8 w-8 items-center justify-center bg-white"
								onClick={() => closeSidebar()}
							>
								<span className="sr-only">Close sidebar</span>
								<X className="h-8 w-8 text-black" aria-hidden="true" />
							</button>
						</Flex>
						<div className="mt-5 h-0 flex-1 overflow-y-auto">
							<nav className="space-y-1 px-2">
								{navigation.map((item) => (
									<MenuItem
										key={item.name}
										name={item.name}
										href={item.href}
										icon={item.icon}
										path={item.path}
									/>
								))}
							</nav>
						</div>
					</Flex>
				</Transition.Child>
				<div className="w-14 flex-shrink-0" aria-hidden="true" />
			</Dialog>
		</Transition.Root>
	);
};
