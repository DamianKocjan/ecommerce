import { Menu, Transition } from "@headlessui/react";
import { User as UserIcon } from "@phosphor-icons/react";
import { signOut } from "next-auth/react";
import React, { Fragment, useCallback } from "react";

import { Button } from "../../../../shared/core/Button";
import { IconButton } from "../../../../shared/core/IconButton";
import { classNames } from "../../../../shared/utils/classnames";
import { ButtonLink } from "../../../core/ButtonLink";

export const AccountMenu: React.FC = () => {
	const handleSignOut = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			void signOut();
		},
		[],
	);

	return (
		<Menu as="div" className="relative">
			<div>
				<Menu.Button
					as={IconButton}
					intent="light"
					className="hover:text-white"
				>
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
				<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-black p-2 text-white outline outline-2 outline-teal-400 focus:outline-0">
					<div>
						<Menu.Item>
							{({ active }) => (
								<ButtonLink
									href=""
									intent="secondary"
									textColor="light"
									fullWidth
									className={classNames("z-10 mb-1", active ? "border-2" : "")}
								>
									Your Profile
								</ButtonLink>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<ButtonLink
									href=""
									intent="secondary"
									textColor="light"
									fullWidth
									className={classNames("z-10 mb-1", active ? "border-2" : "")}
								>
									Settings
								</ButtonLink>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<Button
									onClick={handleSignOut}
									className={classNames(
										"w-full",
										active ? "border-2 border-white" : "",
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
