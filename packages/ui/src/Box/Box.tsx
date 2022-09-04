import React, { ComponentProps } from "react";
import { cva, cx } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

export const box = cva(["box-border"], {
	variants: {
		margin: { 0: "m-0", 2: "m-2", 4: "m-4", 8: "m-8" },
		padding: { 0: "p-0", 2: "p-2", 4: "p-4", 8: "p-8" },
	},
	defaultVariants: {
		margin: 0,
		padding: 0,
	},
});

export type BoxProps = VariantProps<typeof box> & ComponentProps<"div">;

export const Box: React.FC<BoxProps> = ({
	children,
	className,
	margin,
	padding,
	...props
}) => (
	<div className={cx(className, box({ margin, padding }))} {...props}>
		{children}
	</div>
);
