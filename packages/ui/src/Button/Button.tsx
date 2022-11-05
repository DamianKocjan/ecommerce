import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { ComponentProps, forwardRef } from "react";

const button = cva("px-6 h-12 uppercase font-semibold tracking-wider border", {
	variants: {
		intent: {
			primary: "border-black bg-teal-400 text-black",
			secondary: "border-slate-200 text-slate-900",
		},
	},
	defaultVariants: {
		intent: "primary",
	},
});

export type ButtonProps = VariantProps<typeof button> &
	ComponentProps<"button">;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	function Button({ className, intent, ...props }, ref) {
		return (
			<button
				className={button({ intent, class: className })}
				{...props}
				ref={ref}
			/>
		);
	}
);
