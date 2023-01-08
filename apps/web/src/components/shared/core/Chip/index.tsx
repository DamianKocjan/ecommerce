import { cva, type VariantProps } from "class-variance-authority";
import React, { type ComponentProps } from "react";

const chip = cva("inline-block text-center border border-solid mx-1", {
	variants: {
		intent: {
			default: "bg-gray-200 text-gray-800 border-gray-400",
			primary: "bg-teal-400 text-black border-teal-600",
			secondary: "bg-slate-200 text-slate-900 border-slate-400",
			success: "bg-green-400 text-black border-green-600",
			warning: "bg-yellow-400 text-black border-yellow-600",
			danger: "bg-red-400 text-black border-red-600",
		},
		size: {
			small: "text-sm px-2 py-1",
			medium: "text-base px-3 py-2",
			large: "text-lg px-4 py-3",
		},
	},
	defaultVariants: {
		intent: "default",
		size: "medium",
	},
});

export type ChipProps = VariantProps<typeof chip> &
	ComponentProps<"span"> & {
		children: React.ReactNode;
	};

export const Chip: React.FC<ChipProps> = ({
	className,
	children,
	intent,
	size,
	...props
}) => (
	<span className={chip({ intent, size, class: className })} {...props}>
		{children}
	</span>
);
