import { Popover, Transition } from "@headlessui/react";
import { Bag } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useMemo } from "react";

import { trpc } from "../../../../../utils/trpc";
import { Flex } from "../../../../shared/core/Flex";
import { IconButton } from "../../../../shared/core/IconButton";
import { ButtonLink } from "../../../core/ButtonLink";
import { Spinner } from "../../../core/Spinner";
import { useBagStore } from "../../Bag/store";

export const BagButton: React.FC = () => {
	const products = useBagStore((state) => state.products);

	const numOfItems = useMemo(() => products.length, [products]);

	const { data, isLoading, isError, error } = trpc.product.bag.useQuery(
		{ products: products.slice(0, 9) },
		{
			enabled: !!products.length,
			refetchOnWindowFocus: false,
		},
	);

	const isDisabled = isLoading || isError || !data || !data.length;

	return (
		<Popover>
			<Popover.Button
				as={IconButton}
				intent="light"
				className="relative hover:text-white"
				type="button"
			>
				<span className="sr-only">Your bag</span>
				<Bag className="h-6 w-6" aria-hidden="true" />
				<Transition
					as={Flex}
					items="center"
					justify="center"
					show={numOfItems > 0}
					enter="transition ease-in duration-100"
					enterFrom="transform opacity-0"
					enterTo="transform opacity-100"
					leave="transition ease-out duration-100"
					leaveFrom="transform opacity-100"
					leaveTo="transform opacity-0"
					className="absolute top-3 right-2 z-10 h-5 w-5 translate-x-2/4 -translate-y-1/2 rounded-full bg-black text-xs font-bold text-white outline outline-2 outline-teal-400"
				>
					<span>
						{numOfItems > 9 ? "9+" : numOfItems > 0 ? numOfItems : "1"}
					</span>
				</Transition>
			</Popover.Button>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-200"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition ease-in duration-150"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<Popover.Panel className="absolute inset-x-0 top-16 z-20 mt-px bg-white pb-6 shadow-lg sm:px-2 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-80 lg:ring-1 lg:ring-black lg:ring-opacity-5">
					<h2 className="sr-only">Bag</h2>

					<form className="mx-auto max-w-2xl px-4">
						{isLoading ? (
							<Flex
								as="p"
								justify="center"
								items="center"
								className="h-32 gap-2"
							>
								<Spinner className="text-teal-500" />
								<span>Loading...</span>
							</Flex>
						) : isError ? (
							<Flex
								direction="col"
								className="mt-6 mb-4 border border-red-600 bg-red-400 p-4 text-center text-sm"
							>
								<h3 className="font-semibold">Something went wrong!</h3>
								<p className="mt-1 text-xs">
									{error?.message ?? "Unknown error"}
								</p>
							</Flex>
						) : !data || !data.length ? (
							<div className="mt-6 mb-4 text-center text-sm">
								<h3>Your bag is empty!</h3>
							</div>
						) : (
							<ul role="list" className="divide-y divide-gray-200">
								{data.map((product) => (
									<Flex
										as="li"
										key={product.slug}
										items="center"
										className="py-6"
									>
										<Image
											src={product.thumbnailImage}
											alt={product.title}
											className="h-16 w-16 flex-none border border-gray-200"
											width={128}
											height={128}
										/>
										<div className="ml-4 flex-auto">
											<h3 className="font-medium text-gray-900">
												<Link href={`/products/${product.slug}`}>
													{product.title}
												</Link>
											</h3>
											<p className="text-gray-500">
												{product?.colors
													.map((color) => color.name)
													.slice(0, 3)
													.join(", ") +
													(product?.colors.length > 3 ? "..." : "")}
											</p>
										</div>
									</Flex>
								))}

								{numOfItems > 9 && (
									<Flex items="center" className="py-6">
										<div className="flex-auto">
											<h3 className="font-medium text-gray-900">
												+{numOfItems - 9} more to view
											</h3>
										</div>
									</Flex>
								)}
							</ul>
						)}

						<ButtonLink
							href="/checkout"
							intent="primary"
							fullWidth
							className={isDisabled ? "cursor-not-allowed" : ""}
							onClick={isDisabled ? (e) => e.preventDefault() : undefined}
							title={isDisabled ? "Bag is empty" : "Checkout"}
						>
							Checkout
						</ButtonLink>

						<p className="mt-6 text-center text-sm">
							<Link
								href="/cart"
								className="font-medium text-teal-600 hover:text-teal-500"
							>
								View Shopping Bag
							</Link>
						</p>
					</form>
				</Popover.Panel>
			</Transition>
		</Popover>
	);
};
