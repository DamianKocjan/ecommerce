import { classNames } from "@/components/shared/utils";
import { Flex, Grid } from "@ecommerce/ui";
import { Tab } from "@headlessui/react";
import React from "react";

export interface ImageGalleryProps {
	images: { id: string; src: string; alt: string }[];
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
	return (
		<Tab.Group as={Flex} direction="col-reverse">
			{/* Image selector */}
			<div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
				<Tab.List as={Grid} cols="4" className="gap-6">
					{images?.map((image) => (
						<Tab
							key={image.id}
							as={Flex}
							items="center"
							justify="center"
							className="relative h-24 bg-white text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
						>
							{({ selected }) => (
								<>
									<span className="sr-only">{image.name}</span>
									<span className="absolute inset-0 overflow-hidden">
										<img
											src={image.src}
											alt={image.alt}
											className="w-full h-full object-center object-cover"
										/>
									</span>
									<span
										className={classNames(
											selected ? "ring-teal-500" : "ring-transparent",
											"absolute inset-0 ring-2 ring-offset-2 pointer-events-none"
										)}
										aria-hidden="true"
									/>
								</>
							)}
						</Tab>
					))}
				</Tab.List>
			</div>

			<Tab.Panels className="w-full aspect-w-1 aspect-h-1">
				{images?.map((image) => (
					<Tab.Panel key={image.id}>
						<img
							src={image.src}
							alt={image.alt}
							className="w-full h-full object-center object-cover"
						/>
					</Tab.Panel>
				))}
			</Tab.Panels>
		</Tab.Group>
	);
};
