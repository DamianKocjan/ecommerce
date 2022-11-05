import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import React, { ComponentProps } from "react";

const alert = cva("flex px-2 py-3 border border-solid m-2", {
	variants: {
		intent: {
			primary: "bg-teal-400 text-black border-teal-600",
			secondary: "bg-white text-black border-black",
			success: "bg-green-400 text-black border-green-600",
			warning: "bg-yellow-400 text-black border-yellow-600",
			danger: "bg-red-400 text-black border-red-600",
		},
	},
	defaultVariants: {
		intent: "primary",
	},
});

export type AlertProps = VariantProps<typeof alert> &
	ComponentProps<"div"> & {
		children: React.ReactNode;
	};

export const Alert: React.FC<AlertProps> = ({
	className,
	children,
	intent,
	...props
}) => (
	<div className={alert({ intent, class: className })} role="alert" {...props}>
		{children}
	</div>
);
