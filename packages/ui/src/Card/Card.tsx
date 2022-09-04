import React, { ComponentProps } from "react";
import { cva, cx } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { box, BoxProps } from "../Box";

const cardBase = cva(["border-solid", "border-slate-300", "rounded"], {
	variants: {
		shadow: {
			md: "drop-shadow-md",
			lg: "drop-shadow-lg",
			xl: "drop-shadow-xl",
		},
	},
});

type CardBaseProps = VariantProps<typeof cardBase> & ComponentProps<"div">;

// eslint-disable-next-line prettier/prettier
export interface CardProps extends BoxProps, CardBaseProps {}

export const card = ({ margin, padding, shadow }: CardProps = {}) =>
	cx(box({ margin, padding }), cardBase({ shadow }));

export const Card: React.FC<CardProps> = ({
	children,
	className,
	margin,
	padding,
	shadow,
	...props
}) => (
	<div className={cx(className, card({ margin, padding, shadow }))} {...props}>
		{children}
	</div>
);
