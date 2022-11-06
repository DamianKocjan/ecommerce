import { useBag } from "@/features/bag";
import { trpc } from "@/utils/trpc";
import { Button, Flex, IconButton, Spinner } from "@ecommerce/ui";
import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import { Bag } from "phosphor-react";
import React, { Fragment, useMemo } from "react";

const products = [
	{
		id: 1,
		name: "Throwback Hip Bag",
		href: "#",
		color: "Salmon",
		imageSrc:
			"https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
		imageAlt:
			"Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
	},
	{
		id: 2,
		name: "Medium Stuff Satchel",
		href: "#",
		color: "Blue",
		imageSrc:
			"https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
		imageAlt:
			"Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
	},
	// More products...
];

export const BagButton: React.FC = () => {
	const products = useBag((state) => state.products);

	const numOfItems = useMemo(() => products.length, [products]);

	const { data, isLoading, isError } = trpc.useQuery(
		["bagProducts", { products: products.slice(0, 9) }],
		{
			enabled: !!products.length,
			refetchOnWindowFocus: false,
		}
	);

	return (
		<Popover>
			<Popover.Button
				as={IconButton}
				type="button"
				className="hover:text-white text-gray-300 relative"
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
					className="absolute top-3 right-2 translate-x-2/4 -translate-y-1/2 w-5 h-5 text-xs font-bold bg-black outline outline-2 outline-teal-400 text-white rounded-full z-10"
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
				<Popover.Panel className="absolute top-16 inset-x-0 mt-px pb-6 bg-white shadow-lg sm:px-2 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-80 lg:ring-1 lg:ring-black lg:ring-opacity-5 z-20">
					<h2 className="sr-only">Bag</h2>

					<form className="max-w-2xl mx-auto px-4">
						{isLoading ? (
							<Flex justify="center" items="center" className="h-32">
								<Spinner />
							</Flex>
						) : isError ? (
							<Flex justify="center" items="center" className="h-32">
								<h3>There was an error fetching your bag. Please try again.</h3>
							</Flex>
						) : !data || !data.length ? (
							<Flex justify="center" items="center" className="h-32">
								<h3>Your bag is empty.</h3>
							</Flex>
						) : (
							<ul role="list" className="divide-y divide-gray-200">
								{data.map((product) => (
									<Flex
										as="li"
										key={product.slug}
										items="center"
										className="py-6"
									>
										<img
											src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
											alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
											className="flex-none w-16 h-16 border border-gray-200"
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
												<a href="#">+{numOfItems - 9} more to view</a>
											</h3>
										</div>
									</Flex>
								)}
							</ul>
						)}

						<Button
							intent="primary"
							className="w-full disabled:cursor-not-allowed"
							disabled={isLoading || isError || !data || !data.length}
							title={
								isLoading || isError || !data || !data.length
									? "Bag is empty"
									: "Checkout"
							}
						>
							Checkout
						</Button>

						<p className="mt-6 text-center">
							<Link
								href="/cart"
								className="text-sm font-medium text-teal-600 hover:text-teal-500"
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
