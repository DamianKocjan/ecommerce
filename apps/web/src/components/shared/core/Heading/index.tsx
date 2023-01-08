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
				"py-1 px-2 md:py-2 md:px-4 relative before:absolute before:z-[-1] md:before:top-1 md:before:left-1 before:top-0.5 before:left-0.5 before:w-full before:h-full text-white bg-black before:bg-teal-400",
				className
			)}
		>
			{children}
		</Heading>
	);
};
