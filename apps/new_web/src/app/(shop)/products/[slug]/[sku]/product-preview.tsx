"use client";

import Image from "next/image";
import React from "react";

type Props = {
	images: {
		url: string;
	}[];
	thumbnailImage: number;
};

export function ProductPreview({ images, thumbnailImage }: Props) {
	const [currentImage, setCurrentImage] = React.useState(
		images[thumbnailImage]!.url,
	);

	return (
		<div className="grid gap-4 md:gap-8">
			<Image
				src={currentImage}
				alt="Product Image"
				width={600}
				height={900}
				className="aspect-[2/3] w-full overflow-hidden rounded-lg border object-cover"
			/>
			<div className="hidden items-start gap-4 md:flex">
				{images.map((image, index) => (
					<button
						key={index}
						className="hover:border-primary overflow-hidden rounded-lg border transition-colors"
						onClick={() => setCurrentImage(image.url)}
					>
						<Image
							src={image.url}
							alt="Preview thumbnail"
							width={100}
							height={100}
							className="aspect-square object-cover"
						/>
						<span className="sr-only">View Image {index + 1}</span>
					</button>
				))}
			</div>
		</div>
	);
}
