import { signIn, signOut, useSession } from "@ecommerce/auth/nextjs/client";
import { Button, Flex, IconButton } from "@ecommerce/ui";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import {
	Heart as HeartIcon,
	List as MenuIcon,
	SignIn as SignInIcon,
	User as UserIcon,
	X as XIcon,
} from "phosphor-react";
import { Fragment, useCallback } from "react";
import { classNames } from "../../shared/utils";
import { BagButton } from "./BagButton";

const NAVIGATION = [
	{ name: "Home", href: "/" },
	{ name: "Women", href: "/c/women" },
	{ name: "Men", href: "/c/men" },
	{ name: "Kids", href: "/c/kids" },
];

export const Nav: React.FC = () => {
	const { data: session } = useSession();

	const handleSignOut = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			signOut();
		},
		[]
	);

	const handleSignIn = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		signIn("google");
	}, []);

	return (
		<Disclosure as="nav" className="bg-black font-mono">
			{({ open }) => (
				<>
					<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
						<Flex items="center" justify="between" className="relative h-16">
							<Flex
								items="center"
								className="absolute inset-y-0 left-0 sm:hidden"
							>
								{/* Mobile menu button*/}
								<Disclosure.Button
									className="hover:text-white text-gray-300"
									as={IconButton}
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
								<div className="hidden sm:block sm:ml-6">
									<Flex className="space-x-4">
										{NAVIGATION.map((item) => (
											<Link key={item.name} href={item.href}>
												<a>
													<Button
														intent="secondary"
														className={"hover:text-white text-gray-300"}
													>
														{item.name}
													</Button>
												</a>
											</Link>
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
								<Link href="/wishlist">
									<a>
										<IconButton
											type="button"
											className="hover:text-white text-gray-300"
										>
											<span className="sr-only">Wishlist</span>
											<HeartIcon className="h-6 w-6" aria-hidden="true" />
										</IconButton>
									</a>
								</Link>

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
									<Menu as="div" className="relative">
										<div>
											<Menu.Button
												className="hover:text-white text-gray-300"
												as={IconButton}
											>
												<span className="sr-only">Open user menu</span>
												<UserIcon
													className="block h-6 w-6"
													aria-hidden="true"
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
											<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 p-2 bg-black outline outline-2 outline-teal-400 focus:outline-0 text-white z-10">
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
											</Menu.Items>
										</Transition>
									</Menu>
								) : (
									<IconButton
										type="button"
										className="hover:text-white text-gray-300"
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
							items="stretch"
							className="px-2 pt-2 pb-3 space-y-1"
						>
							{NAVIGATION.map((item) => (
								<Disclosure.Button key={item.name} as={Link} href={item.href}>
									<Button
										intent="secondary"
										className="hover:text-white text-gray-300 flex-1 mx-1 my-2 first-of-type:mt-1"
									>
										{item.name}
									</Button>
								</Disclosure.Button>
							))}
						</Flex>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};
