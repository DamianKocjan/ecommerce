import { Dialog, Transition } from "@headlessui/react";
import { ArrowLeft as ArrowLeftIcon, X as XIcon } from "@phosphor-icons/react";
import React, { Fragment, useCallback, useState } from "react";

import { Flex } from "~/components/shared/core/Flex";
import { Grid } from "~/components/shared/core/Grid";
import { IconButton } from "~/components/shared/core/IconButton";

export interface CategoryItemProps {
	category: {
		name: string;
		href: string;
	};
	handleCloseParentPanel: () => void;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
	category,
	handleCloseParentPanel,
}) => {
	const [open, setOpen] = useState(false);

	const handleCategoriesModalOpen = useCallback(() => {
		setOpen(true);
	}, []);

	const handleCategoriesModalClose = useCallback(() => {
		setOpen(false);
	}, []);

	const handleCloseAllPanels = useCallback(() => {
		handleCloseParentPanel();
		handleCategoriesModalClose();
	}, [handleCloseParentPanel, handleCategoriesModalClose]);

	return (
		<>
			<div onClick={handleCategoriesModalOpen} role="button">
				<div>
					<img
						src="https://tailwindcss.com/_next/static/media/retro-shoe.24e25785.jpg"
						alt={`${category.name} category image`}
						className="object-cover"
						loading="lazy"
					/>
					<h3 className="text-lg text-black decoration-teal-400 decoration-2 underline-offset-4 hover:underline">
						{category.name}
					</h3>
				</div>
			</div>
			<Transition.Root show={open} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={setOpen}>
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
												<Flex items="center" className="align-middle">
													<IconButton
														type="button"
														intent="secondary"
														className="mr-4"
														onClick={handleCategoriesModalClose}
													>
														<span className="sr-only">
															Go to previous panel
														</span>
														<ArrowLeftIcon
															className="h-6 w-6"
															aria-hidden="true"
														/>
													</IconButton>
													<Dialog.Title className="w-fit border-b-2 border-solid border-teal-400 bg-black px-2 py-1 text-xl font-medium text-white md:px-4 md:py-2">
														{category.name}
													</Dialog.Title>
												</Flex>
												<IconButton
													type="button"
													intent="secondary"
													className="absolute right-0 top-[-4px] mr-4"
													onClick={handleCloseAllPanels}
												>
													<span className="sr-only">Close panel</span>
													<XIcon className="h-6 w-6" aria-hidden="true" />
												</IconButton>
											</div>
											<div className="relative mt-6 flex-1 px-4 sm:px-6">
												<Grid cols="2" className="my-4 gap-x-3 gap-y-5"></Grid>
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
