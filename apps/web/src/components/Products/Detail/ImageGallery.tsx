import { Tab } from "@headlessui/react";
import React from "react";

import { Flex } from "../../shared/core/Flex";
import { Grid } from "../../shared/core/Grid";
import { classNames } from "../../shared/utils/classnames";

export interface ImageGalleryProps {
	images: { id: string; src: string; alt: string }[];
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
	return (
		<Tab.Group as={Flex} direction="col-reverse">
			{/* Image selector */}
			<div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
				<Tab.List as={Grid} cols="4" className="gap-6">
					{images?.map((image) => (
						<Tab
							key={image.id}
							as={Flex}
							items="center"
							justify="center"
							className="relative h-24 cursor-pointer bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
						>
							{({ selected }) => (
								<>
									<span className="sr-only">{image.alt}</span>
									<span className="absolute inset-0 overflow-hidden">
										<img
											src={image.src}
											alt={image.alt}
											className="h-full w-full object-cover object-center"
										/>
									</span>
									<span
										className={classNames(
											selected ? "ring-teal-500" : "ring-transparent",
											"pointer-events-none absolute inset-0 ring-2 ring-offset-2",
										)}
										aria-hidden="true"
									/>
								</>
							)}
						</Tab>
					))}
				</Tab.List>
			</div>

			<Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
				{images?.map((image) => (
					<Tab.Panel key={image.id}>
						<img
							src={image.src}
							alt={image.alt}
							className="h-full w-full object-cover object-center"
						/>
					</Tab.Panel>
				))}
			</Tab.Panels>
		</Tab.Group>
	);
};
