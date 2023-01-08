import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ComponentProps } from "react";

const button = cva("px-6 h-12 uppercase font-semibold tracking-wider border", {
	variants: {
		intent: {
			primary: "border-black bg-teal-400",
			secondary: "border-slate-200",
		},
		textColor: {
			light: "text-gray-300 hover:text-white",
			dark: "text-slate-900 hover:text-black",
		},
	},
	defaultVariants: {
		intent: "primary",
		textColor: "dark",
	},
});

export type ButtonProps = VariantProps<typeof button> &
	ComponentProps<"button">;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	function Button({ className, intent, textColor, ...props }, ref) {
		return (
			<button
				className={button({ intent, textColor, class: className })}
				{...props}
				ref={ref}
			/>
		);
	},
);
