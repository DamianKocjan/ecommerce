import { IconButton } from "@ecommerce/ui";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowLeft as ArrowLeftIcon, X as XIcon } from "phosphor-react";
import React, { Fragment, useCallback, useState } from "react";

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
					<h3 className="text-lg text-black hover:underline underline-offset-4 decoration-teal-400 decoration-2">
						{category.name}
					</h3>
				</div>
			</div>
			<Transition.Root show={open} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={setOpen}>
					<div className="fixed inset-0 overflow-hidden">
						<div className="absolute inset-0 overflow-hidden">
							<div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
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
										<div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl font-mono">
											<div className="px-4 sm:px-6 relative">
												<div className="flex items-center align-middle">
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
													<Dialog.Title className="text-xl font-medium py-1 px-2 md:py-2 md:px-4 w-fit text-white bg-black border-b-2 border-solid border-teal-400">
														{category.name}
													</Dialog.Title>
												</div>
												<IconButton
													type="button"
													intent="secondary"
													className="absolute top-[-4px] right-0 mr-4"
													onClick={handleCloseAllPanels}
												>
													<span className="sr-only">Close panel</span>
													<XIcon className="h-6 w-6" aria-hidden="true" />
												</IconButton>
											</div>
											<div className="relative mt-6 flex-1 px-4 sm:px-6">
												<div className="grid grid-cols-2 gap-x-3 gap-y-5 my-4"></div>
											</div>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
};
