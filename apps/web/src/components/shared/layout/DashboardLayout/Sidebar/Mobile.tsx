import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { X } from "phosphor-react";
import React, { Fragment } from "react";
import { Flex } from "../../../core/Flex";
import { classNames } from "../../../utils/classnames";
import { navigation } from "../constants";
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
						className="relative w-full max-w-xs flex-1 bg-white pt-5 pb-4"
					>
						<Flex
							items="center"
							justify="between"
							className="flex-shrink-0 px-4"
						>
							<img
								className="h-8 w-auto"
								src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
								alt="Workflow"
							/>

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
									<Link
										key={item.name}
										href={item.href}
										className={classNames(
											item.current
												? "bg-gray-100 text-gray-900"
												: "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
											"group flex items-center rounded-md px-2 py-2 text-base font-medium",
										)}
									>
										<item.icon
											className={classNames(
												item.current
													? "text-gray-500"
													: "text-gray-400 group-hover:text-gray-500",
												"mr-4 h-6 w-6 flex-shrink-0",
											)}
											aria-hidden="true"
										/>
										{item.name}
									</Link>
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
