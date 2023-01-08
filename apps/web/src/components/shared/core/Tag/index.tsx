import { cva, type VariantProps } from "class-variance-authority";
import React, { type ComponentProps } from "react";

const tag = cva("inline-block text-center mx-1", {
	variants: {
		intent: {
			default: "bg-gray-200 text-gray-800",
			primary: "bg-teal-400 text-black",
			secondary: "bg-slate-200 text-slate-900",
			success: "bg-green-400 text-black",
			warning: "bg-yellow-400 text-black",
			danger: "bg-red-400 text-black",
		},
		size: {
			small: "text-sm px-1 py-0.5",
			medium: "text-base px-2 py-1",
			large: "text-lg px-3 py-2",
		},
	},
	defaultVariants: {
		intent: "default",
		size: "medium",
	},
});

export type TagProps = VariantProps<typeof tag> &
	ComponentProps<"span"> & {
		children: React.ReactNode;
	};

export const Tag: React.FC<TagProps> = ({
	className,
	children,
	intent,
	size,
	...props
}) => (
	<span className={tag({ intent, size, class: className })} {...props}>
		{children}
	</span>
);
