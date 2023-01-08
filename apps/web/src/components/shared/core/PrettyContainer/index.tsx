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
				"py-1 px-2 md:py-2 md:px-4 relative before:absolute before:z-[-1] md:before:top-1 md:before:left-1 before:top-0.5 before:left-0.5 before:w-full before:h-full text-white bg-black before:bg-teal-400",
				className
			)}
		>
			{children}
		</div>
	);
};
