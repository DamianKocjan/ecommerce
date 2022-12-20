import { classNames } from "@/components/shared/utils";
import { signOut } from "@ecommerce/auth/nextjs/client";
import { Button, IconButton } from "@ecommerce/ui";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { User as UserIcon } from "phosphor-react";
import React, { Fragment, useCallback } from "react";

export const AccountMenu: React.FC = () => {
	const handleSignOut = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			signOut();
		},
		[]
	);

	return (
		<Menu as="div" className="relative">
			<div>
				<Menu.Button className="hover:text-white text-gray-300" as={IconButton}>
					<span className="sr-only">Open user menu</span>
					<UserIcon className="block h-6 w-6" aria-hidden="true" />
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
				<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 p-2 bg-black outline outline-2 outline-teal-400 focus:outline-0 text-white z-10">
					<div>
						<Menu.Item>
							{({ active }) => (
								<Link href="">
									<a>
										<Button
											intent="secondary"
											className={classNames(
												active ? "text-white" : "text-gray-300",
												"w-full mb-1 z-10"
											)}
										>
											Your Profile
										</Button>
									</a>
								</Link>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<Link href="">
									<a>
										<Button
											intent="secondary"
											className={classNames(
												active ? "text-white" : "text-gray-300",
												"w-full my-1"
											)}
										>
											Settings
										</Button>
									</a>
								</Link>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<Button
									onClick={handleSignOut}
									className={classNames(
										active ? "text-black" : "text-gray-800",
										"w-full mt-1"
									)}
								>
									Sign out
								</Button>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};
