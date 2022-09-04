import { cx } from "class-variance-authority";
import Image from "next/future/image";
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
				"relative bg-black w-full before:absolute before:z-[-1] md:before:top-1 md:before:left-1 before:top-0.5 before:left-0.5 before:w-full before:h-full before:bg-teal-400",
				className
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
