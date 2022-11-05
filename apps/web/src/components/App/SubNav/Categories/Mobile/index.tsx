import { Button, IconButton } from "@ecommerce/ui";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import {
	DotsThreeVertical as DotsThreeVerticalIcon,
	X as XIcon,
} from "phosphor-react";
import { Fragment, useCallback, useState } from "react";
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
												<Dialog.Title className="text-xl font-medium py-1 px-2 md:py-2 md:px-4 w-fit text-white bg-black border-b-2 border-solid border-teal-400">
													Search by categories
												</Dialog.Title>
												<IconButton
													type="button"
													intent="secondary"
													className="absolute top-[-4px] right-0 mr-4"
													onClick={handleCategoriesModalClose}
												>
													<span className="sr-only">Close panel</span>
													<XIcon className="h-6 w-6" aria-hidden="true" />
												</IconButton>
											</div>
											<div className="relative mt-6 flex-1 px-4 sm:px-6">
												<div className="flex flex-row justify-around">
													<Link href="/c/women">
														<Button intent="secondary" className="w-full">
															Women
														</Button>
													</Link>
													<Link href="/c/men">
														<Button intent="secondary" className="w-full">
															Men
														</Button>
													</Link>
													<Link href="/c/kids">
														<Button intent="secondary" className="w-full">
															Kids
														</Button>
													</Link>
												</div>

												<div className="grid grid-cols-2 gap-x-3 gap-y-5 my-4">
													{categories.map((category, index) => (
														<CategoryItem
															category={category}
															handleCloseParentPanel={
																handleCategoriesModalClose
															}
															key={index}
														/>
													))}
												</div>
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
