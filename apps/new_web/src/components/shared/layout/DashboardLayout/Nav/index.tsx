import { Menu, Transition } from "@headlessui/react";
import { List, MagnifyingGlass } from "@phosphor-icons/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useCallback } from "react";

import { Flex } from "~/components/shared/core/Flex";
import { classNames } from "~/components/shared/utils/classnames";
import { useSidebar } from "../Sidebar/store";
import { userNavigation } from "../constants";

export const Nav: React.FC = () => {
	const openSidebar = useSidebar((state) => state.open);

	const handleSignOut = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			void signOut();
		},
		[],
	);

	return (
		<Flex className="sticky top-0 z-10 h-16 flex-shrink-0 bg-white shadow">
			<button
				type="button"
				className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
				onClick={() => openSidebar()}
			>
				<span className="sr-only">Open sidebar</span>
				<List className="h-6 w-6" aria-hidden="true" />
			</button>

			<Flex justify="between" className="flex-1 px-4">
				<Flex className="flex-1">
					<form className="flex w-full md:ml-0" action="#" method="GET">
						<label htmlFor="search-field" className="sr-only">
							Search
						</label>
						<div className="relative w-full text-gray-400 focus-within:text-gray-600">
							<Flex
								items="center"
								className="pointer-events-none absolute inset-y-0 left-0"
							>
								<MagnifyingGlass className="h-5 w-5" aria-hidden="true" />
							</Flex>
							<input
								id="search-field"
								className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
								placeholder="Search"
								type="search"
								name="search"
							/>
						</div>
					</form>
				</Flex>

				<Flex items="center" className="ml-4 md:ml-6">
					<Menu as="div" className="relative ml-3">
						<div>
							<Menu.Button className="flex max-w-xs items-center border-2 border-black bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
								<span className="sr-only">Open user menu</span>
								<Image
									className="h-8 w-8"
									src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
									alt="Profile picture"
									width={128}
									height={128}
								/>
							</Menu.Button>
						</div>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
								{userNavigation.map((item) => (
									<Menu.Item key={item.name}>
										{({ active }) => (
											<Link
												href={item.href}
												className={classNames(
													active ? "bg-gray-100" : "",
													"block px-4 py-2 text-sm text-gray-700",
												)}
											>
												{item.name}
											</Link>
										)}
									</Menu.Item>
								))}

								<Menu.Item>
									{({ active }) => (
										<button
											onClick={handleSignOut}
											className={classNames(
												active ? "bg-gray-100" : "",
												"block w-full px-4 py-2 text-left text-sm text-gray-700",
											)}
										>
											Sign out
										</button>
									)}
								</Menu.Item>
							</Menu.Items>
						</Transition>
					</Menu>
				</Flex>
			</Flex>
		</Flex>
	);
};
