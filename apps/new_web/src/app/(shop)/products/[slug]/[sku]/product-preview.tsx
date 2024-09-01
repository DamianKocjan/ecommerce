"use client";

import Image from "next/image";
import React from "react";

import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "~/components/ui/carousel";
import { cn } from "~/lib/utils";

type Props = {
	images: {
		url: string;
	}[];
	thumbnailImage: number;
};

export function ProductPreview({ images, thumbnailImage }: Props) {
	const [api, setApi] = React.useState<CarouselApi>();
	const [current, setCurrent] = React.useState(thumbnailImage);

	React.useEffect(() => {
		if (!api) {
			return;
		}

		setCurrent(api.selectedScrollSnap() + 1);

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	React.useEffect(() => {
		api?.scrollTo(thumbnailImage, true);
	}, [api, thumbnailImage]);

	return (
		<div className="px-12">
			<Carousel className="grid gap-4 md:gap-8" setApi={setApi}>
				<div className="relative">
					<CarouselContent>
						{images.map((image, index) => (
							<CarouselItem key={index}>
								<Image
									src={image.url}
									alt="Product Image"
									width={600}
									height={900}
									className="h-auto w-full overflow-hidden rounded-lg border object-cover"
								/>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</div>

				<div className="hidden items-start gap-4 md:flex">
					{images.map((image, index) => (
						<button
							key={index}
							className={cn(
								"hover:border-primary/90 overflow-hidden rounded-lg border transition-colors",
								{
									"border-primary": index + 1 === current,
								},
							)}
							onClick={() => api?.scrollTo(index)}
						>
							<Image
								src={image.url}
								alt={`Preview thumbnail ${index + 1}`}
								width={100}
								height={100}
								className="aspect-square object-cover"
							/>
							<span className="sr-only">View Image {index + 1}</span>
						</button>
					))}
				</div>
			</Carousel>
		</div>
	);
}
