import { cx } from "class-variance-authority";
import Image from "next/image";
import React from "react";

export interface PrettyImageProps {
	src: string;
	alt: string;
	className?: string;
}

export const PrettyImage: React.FC<PrettyImageProps> = ({
	src,
	alt,
	className,
}) => {
	return (
		<div
			className={cx(
				"relative w-full bg-black before:absolute before:left-0.5 before:top-0.5 before:z-[-1] before:h-full before:w-full before:bg-teal-400 md:before:left-1 md:before:top-1",
				className,
			)}
		>
			<Image
				src={src}
				alt={alt}
				loading="lazy"
				fill
				className="pl-0.5 pt-0.5 md:pl-1 md:pt-1"
				sizes="(min-width: 768px) 768px, 100vw"
			/>
		</div>
	);
};
