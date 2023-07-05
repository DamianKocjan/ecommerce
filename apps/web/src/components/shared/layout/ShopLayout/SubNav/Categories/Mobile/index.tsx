import { Dialog, Transition } from "@headlessui/react";
import {
	DotsThreeVertical as DotsThreeVerticalIcon,
	X as XIcon,
} from "@phosphor-icons/react";
import React, { Fragment, useCallback, useState } from "react";

import { ButtonLink } from "~/components/shared/core/ButtonLink";
import { Flex } from "~/components/shared/core/Flex";
import { Grid } from "~/components/shared/core/Grid";
import { IconButton } from "~/components/shared/core/IconButton";
import { CategoryItem } from "./CategoryItem";

export interface CategoryItemProps {
	name: string;
	href: string;
}

export interface MobileCategoriesProps {
	categories: CategoryItemProps[];
}

export const MobileCategories: React.FC<MobileCategoriesProps> = ({
	categories,
}) => {
	const [open, setOpen] = useState(false);

	const handleCategoriesModalOpen = useCallback(() => {
		setOpen(true);
	}, []);

	const handleCategoriesModalClose = useCallback(() => {
		setOpen(false);
	}, []);

	return (
		<>
			<IconButton
				intent="secondary"
				className="md:hidden"
				onClick={handleCategoriesModalOpen}
			>
				<span className="sr-only">Categories</span>
				<DotsThreeVerticalIcon
					className="block h-6 w-6 text-black"
					aria-hidden="true"
				/>
			</IconButton>
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
						<div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-hidden">
						<div className="absolute inset-0 overflow-hidden">
							<Flex className="pointer-events-none fixed inset-y-0 left-0 max-w-full pr-10">
								<Transition.Child
									as={Fragment}
									enter="transform transition ease-in-out duration-500 sm:duration-700"
									enterFrom="-translate-x-full"
									enterTo="translate-x-0"
									leave="transform transition ease-in-out duration-500 sm:duration-700"
									leaveFrom="translate-x-0"
									leaveTo="-translate-x-full"
								>
									<Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
										<Flex
											direction="col"
											className="h-full overflow-y-scroll bg-white py-6 font-mono shadow-xl"
										>
											<div className="relative px-4 sm:px-6">
												<Dialog.Title className="w-fit border-b-2 border-solid border-teal-400 bg-black px-2 py-1 text-xl font-medium text-white md:px-4 md:py-2">
													Search by categories
												</Dialog.Title>
												<IconButton
													type="button"
													intent="secondary"
													className="absolute right-0 top-[-4px] mr-4"
													onClick={handleCategoriesModalClose}
												>
													<span className="sr-only">Close panel</span>
													<XIcon className="h-6 w-6" aria-hidden="true" />
												</IconButton>
											</div>
											<div className="relative mt-6 flex-1 px-4 sm:px-6">
												<Flex justify="around">
													<ButtonLink
														href="/c/women"
														intent="secondary"
														fullWidth
													>
														Women
													</ButtonLink>
													<ButtonLink
														href="/c/men"
														intent="secondary"
														fullWidth
													>
														Men
													</ButtonLink>
													<ButtonLink
														href="/c/kids"
														intent="secondary"
														fullWidth
													>
														Kids
													</ButtonLink>
												</Flex>

												<Grid cols="2" className="my-4 gap-x-3 gap-y-5">
													{categories.map((category, index) => (
														<CategoryItem
															category={category}
															handleCloseParentPanel={
																handleCategoriesModalClose
															}
															key={index}
														/>
													))}
												</Grid>
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
