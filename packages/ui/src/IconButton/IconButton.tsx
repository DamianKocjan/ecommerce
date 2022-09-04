import type { VariantProps } from "class-variance-authority";
import { cva, cx } from "class-variance-authority";
import React, { forwardRef } from "react";

const iconButton = cva(
	["flex-none", "flex", "items-center", "justify-center", "w-12", "h-12"],
	{
		variants: {
			intent: {
				primary: "text-teal-400",
				secondary: "text-black",
			},
		},
		defaultVariants: {},
	}
);

export type IconButtonProps = VariantProps<typeof iconButton> &
	React.ComponentProps<"button">;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	function IconButton({ className, children, intent, ...props }, ref) {
		return (
			<button
				className={cx(className, iconButton({ intent }))}
				{...props}
				ref={ref}
			>
				{children}
			</button>
		);
	}
);
