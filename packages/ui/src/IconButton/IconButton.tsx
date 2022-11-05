import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import React, { forwardRef } from "react";

const iconButton = cva("flex-none flex items-center justify-center w-12 h-12", {
	variants: {
		intent: {
			primary: "text-teal-400",
			secondary: "text-black",
		},
	},
	defaultVariants: {
		intent: "primary",
	},
});

export type IconButtonProps = VariantProps<typeof iconButton> &
	React.ComponentProps<"button">;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	function IconButton({ className, children, intent, ...props }, ref) {
		return (
			<button
				className={iconButton({ intent, class: className })}
				{...props}
				ref={ref}
			>
				{children}
			</button>
		);
	}
);
