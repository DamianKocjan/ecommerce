import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const tooltip = cva(
	"bg-white text-black absolute hidden z-50 invisible opacity-0 group-hover:block group-hover:visible group-hover:opacity-95 group-focus:block  group-focus:visible group-focus:opacity-95 py-2 px-4 shadow h-auto w-80 min-w-min transition-opacity delay-200 ease-in-out border border-black",
	{
		variants: {
			position: {
				top: "bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1",
				bottom: "top-full left-1/2 transform -translate-x-1/2 translate-y-1",
				left: "left-full top-1/2 transform translate-x-1 -translate-y-1/2",
				right: "right-full top-1/2 transform -translate-x-1 -translate-y-1/2",
			},
		},
		defaultVariants: {
			position: "top",
		},
	},
);

export type TooltipProps = VariantProps<typeof tooltip> & {
	title: string;
	children: React.ReactNode;
};

export const Tooltip: React.FC<TooltipProps> = ({
	children,
	position,
	title,
}) => (
	<div className="group relative">
		<div className={tooltip({ position })} role="tooltip">
			{title}
		</div>
		<div>{children}</div>
	</div>
);
