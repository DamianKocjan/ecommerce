import { Dialog, Transition } from "@headlessui/react";
import {
	ArrowLeft,
	ListMagnifyingGlass,
	WarningCircle,
	X,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useCallback, useMemo, useState } from "react";

import { trpc } from "../../../../utils/trpc";
import { Flex } from "../../core/Flex";
import { Spinner } from "../../core/Spinner";
import { CategoryListItem } from "./CategoryListItem";

export interface CategoriesDesktopPanelProps {
	parentCategory?: string;
	previousUrl?: string;
}

export const CategoriesDesktopPanel: React.FC<CategoriesDesktopPanelProps> = ({
	parentCategory,
	previousUrl,
}) => {
	const router = useRouter();
	const [open, setOpen] = useState(false);

	const previousCategorySlug = useMemo(() => {
		if (!previousUrl || previousUrl === router.asPath) {
			return;
		}

		if (previousUrl.includes("/c/")) {
			const slug = previousUrl.split("/c/")[1];
			if (slug?.includes("?q=")) {
				return slug?.split("?q=")[0];
			}
			return slug;
		}
	}, [previousUrl, router]);

	const categories = trpc.category.all.useQuery(
		{
			category: parentCategory,
			parentCategory: previousCategorySlug,
		},
		{
			refetchOnWindowFocus: false,
		},
	);

	const handleOpen = useCallback(() => {
		setOpen(true);
	}, []);

	return (
		<>
			<button
				className="focus-visible:ring-teal relative cursor-pointer py-2 pl-3 pr-4 text-left focus:outline-none focus-visible:border-teal-500 focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 sm:text-sm"
				onClick={handleOpen}
			>
				<span className="mr-4 block truncate">Categories</span>
				<Flex
					as="span"
					items="center"
					className="pointer-events-none absolute inset-y-0 right-0 pr-1"
				>
					<ListMagnifyingGlass className="h-5 w-5" aria-hidden="true" />
				</Flex>
			</button>

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
							<Flex className="pointer-events-none fixed inset-y-0 left-0 max-w-full pr-10">
								<Transition.Child
									as={Fragment}
									enter="transform transition ease-in-out duration-500 sm:duration-700"
									enterFrom="-translate-x-full"
									enterTo="0"
									leave="transform transition ease-in-out duration-500 sm:duration-700"
									leaveFrom="0"
									leaveTo="-translate-x-full"
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
											<Flex className="absolute top-0 right-0 -mr-8 pt-4 pl-2 sm:-mr-10 sm:pl-4">
												<button
													type="button"
													className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
													onClick={() => setOpen(false)}
												>
													<span className="sr-only">Close panel</span>
													<X className="h-6 w-6" aria-hidden="true" />
												</button>
											</Flex>
										</Transition.Child>
										<Flex
											direction="col"
											className="h-full overflow-y-auto bg-white py-6 shadow-xl"
										>
											<div className="px-4 sm:px-6">
												<Dialog.Title className="text-lg font-medium text-gray-900">
													Categories
												</Dialog.Title>
											</div>
											<div className="relative mt-6 flex-1 px-4 sm:px-6">
												<div className="absolute inset-0 px-4 sm:px-6">
													{categories.isLoading ? (
														<Flex
															items="center"
															className="my-4 ml-2 text-slate-700"
														>
															<Spinner className="text-teal-500" />
															Loading categories...
														</Flex>
													) : categories.isError ? (
														<Flex className="my-4 ml-2 gap-4 py-4 px-2 text-slate-700 outline outline-black">
															<WarningCircle className="h-8 w-8 text-red-500" />
															<Flex direction="col">
																<h4 className="text-bold text-sm text-red-500">
																	An error occurred!
																</h4>
																<p className="text-xs">
																	{categories.error?.message ?? "Unknown error"}
																</p>
															</Flex>
														</Flex>
													) : (
														<ul className="my-4 mx-2">
															{previousCategorySlug !== null &&
																categories.data?.parentCategory && (
																	<li className="text-xl font-semibold text-neutral-500 decoration-teal-400 decoration-2 underline-offset-[3px] hover:text-black hover:underline">
																		<Link
																			href={`/c/${categories.data.parentCategory.slug}`}
																		>
																			<Flex items="center" className="gap-2">
																				<ArrowLeft className="h-5 w-5" />
																				{categories.data.parentCategory.name}
																			</Flex>
																		</Link>
																	</li>
																)}
															{categories.data?.category && (
																<li className="text-xl font-semibold decoration-teal-400 decoration-2 underline-offset-[3px] hover:underline">
																	<Link
																		href={`/c/${categories.data.category.slug}`}
																	>
																		{categories.data.category.name}
																	</Link>
																</li>
															)}
															{categories.data?.categories.map(
																({ name, slug }) => (
																	<CategoryListItem
																		key={`subcategory-${slug}`}
																		name={name}
																		slug={slug}
																	/>
																),
															)}
														</ul>
													)}
												</div>
											</div>
										</Flex>
									</Dialog.Panel>
								</Transition.Child>
							</Flex>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
};
