import { classNames } from "@/components/shared/utils";
import { Flex } from "@ecommerce/ui";
import { Disclosure } from "@headlessui/react";
import { Minus, Plus } from "phosphor-react";
import React from "react";

export interface ProductDetailsProps {
	details: {
		name: string;
		items: string[];
	}[];
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ details }) => {
	return (
		<section aria-labelledby="details-heading" className="mt-12">
			<h2 id="details-heading" className="sr-only">
				Additional details
			</h2>

			<div className="border-t divide-y divide-gray-200">
				{details?.map((detail) => (
					<Disclosure as="div" key={detail.name}>
						{({ open }) => (
							<>
								<h3>
									<Disclosure.Button
										as={Flex}
										items="center"
										justify="between"
										className="group relative w-full py-6 text-left"
									>
										<span
											className={classNames(
												open ? "text-teal-600" : "text-gray-900",
												"font-semibold"
											)}
										>
											{detail.name}
										</span>
										<Flex as="span" items="center" className="ml-6">
											{open ? (
												<Minus
													className="block h-6 w-6 text-teal-400 group-hover:text-teal-500"
													aria-hidden="true"
												/>
											) : (
												<Plus
													className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
													aria-hidden="true"
												/>
											)}
										</Flex>
									</Disclosure.Button>
								</h3>
								<Disclosure.Panel as="div" className="pb-6 prose prose-sm">
									<ul role="list">
										{detail.items.map((item) => (
											<li key={item}>{item}</li>
										))}
									</ul>
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
				))}
			</div>
		</section>
	);
};
