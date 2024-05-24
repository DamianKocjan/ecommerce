import { cx } from "class-variance-authority";
import React from "react";

export interface HeadingProps {
	className?: string;
	children: React.ReactNode;
	heading?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Heading: React.FC<HeadingProps> = ({
	className,
	children,
	heading = "h1",
}) => {
	const Heading = heading;

	return (
		<Heading
			className={cx(
				"relative bg-black px-2 py-1 text-white before:absolute before:left-0.5 before:top-0.5 before:z-[-1] before:h-full before:w-full before:bg-teal-400 md:px-4 md:py-2 md:before:left-1 md:before:top-1",
				className,
			)}
		>
			{children}
		</Heading>
	);
};
