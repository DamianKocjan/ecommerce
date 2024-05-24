import { cx } from "class-variance-authority";
import React from "react";

export interface PrettyContainerProps {
	className?: string;
	children: React.ReactNode;
}

export const PrettyContainer: React.FC<PrettyContainerProps> = ({
	className,
	children,
}) => {
	return (
		<div
			className={cx(
				"relative bg-black px-2 py-1 text-white before:absolute before:left-0.5 before:top-0.5 before:z-[-1] before:h-full before:w-full before:bg-teal-400 md:px-4 md:py-2 md:before:left-1 md:before:top-1",
				className,
			)}
		>
			{children}
		</div>
	);
};
