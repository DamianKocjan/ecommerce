import { Disclosure } from "@headlessui/react";
import {
	Heart as HeartIcon,
	List as MenuIcon,
	SignIn as SignInIcon,
	X as XIcon,
} from "@phosphor-icons/react";
import { signIn, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import React, { useCallback } from "react";

import { ButtonLink } from "../../../core/ButtonLink";
import { Flex } from "../../../core/Flex";
import { IconButton } from "../../../core/IconButton";
import { IconButtonLink } from "../../../core/IconButtonLink";

const NAVIGATION = [
	{ name: "Home", href: "/" },
	{ name: "Women", href: "/c/women" },
	{ name: "Men", href: "/c/men" },
	{ name: "Kids", href: "/c/kids" },
];

const AccountMenu = dynamic(
	() => import("./AccountMenu").then((mod) => mod.AccountMenu),
	{
		ssr: false,
	},
);

const BagButton = dynamic(
	() => import("./BagButton").then((mod) => mod.BagButton),
	{
		ssr: false,
	},
);

export const Nav: React.FC = () => {
	const { data: session } = useSession();

	const handleSignIn = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		void signIn("google");
	}, []);

	return (
		<Disclosure as="nav" className="bg-black font-mono">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<Flex items="center" justify="between" className="relative h-16">
							<Flex
								items="center"
								className="absolute inset-y-0 left-0 sm:hidden"
							>
								{/* Mobile menu button*/}
								<Disclosure.Button
									as={IconButton}
									intent="light"
									className="hover:text-white"
								>
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<MenuIcon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</Flex>
							<Flex items="center" justify="center">
								<div className="hidden sm:ml-6 sm:block">
									<Flex className="space-x-4">
										{NAVIGATION.map((item) => (
											<ButtonLink
												key={item.name}
												href={item.href}
												intent="secondary"
												textColor="light"
											>
												{item.name}
											</ButtonLink>
										))}
									</Flex>
								</div>
							</Flex>
							{/* TODO: center logo */}
							{/* <div className="hidden sm:flex-1 sm:flex sm:items-stretch sm:justify-start">
								<img
									className="h-8 w-auto self-center block flex-grow"
									// src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
									src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
									alt="Workflow"
									loading="lazy"
								/>
							</div> */}
							<Flex
								items="center"
								className="absolute inset-y-0 right-0 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
							>
								<IconButtonLink
									intent="light"
									className="hover:text-white"
									href="/wishlist"
								>
									<span className="sr-only">Wishlist</span>
									<HeartIcon className="h-6 w-6" aria-hidden="true" />
								</IconButtonLink>

								{/* <Link href="/cart">
									<a>
										<IconButton
											type="button"
											className="hover:text-white text-gray-300 relative"
										>
											<span className="sr-only">Your bag</span>
											<BagIcon className="h-6 w-6" aria-hidden="true" />
											<Transition
												show={numOfItems > 0}
												enter="transition ease-in duration-100"
												enterFrom="transform opacity-0"
												enterTo="transform opacity-100"
												leave="transition ease-out duration-100"
												leaveFrom="transform opacity-100"
												leaveTo="transform opacity-0"
												className="absolute flex items-center justify-center top-3 right-2 translate-x-2/4 -translate-y-1/2 w-5 h-5 text-xs font-bold bg-black outline outline-2 outline-teal-400 text-white rounded-full z-10"
											>
												<span>
													{numOfItems > 9
														? "9+"
														: numOfItems > 0
														? numOfItems
														: "1"}
												</span>
											</Transition>
										</IconButton>
									</a>
								</Link> */}
								<BagButton />

								{/* Profile dropdown */}
								{session ? (
									<AccountMenu />
								) : (
									<IconButton
										intent="light"
										className="hover:text-white"
										type="button"
										onClick={handleSignIn}
									>
										<span className="sr-only">Login</span>
										<SignInIcon className="h-6 w-6" aria-hidden="true" />
									</IconButton>
								)}
							</Flex>
						</Flex>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<Flex
							direction="row"
							items="baseline"
							className="space-y-1 px-2 pt-2 pb-3"
						>
							{NAVIGATION.map((item) => (
								<Disclosure.Button
									key={item.name}
									className="mx-1 my-2 flex-1 first-of-type:mt-1"
								>
									<ButtonLink
										href={item.href}
										intent="secondary"
										textColor="light"
										fullWidth
									>
										{item.name}
									</ButtonLink>
								</Disclosure.Button>
							))}
						</Flex>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};
