import type { VariantProps } from "class-variance-authority";
import { cva, cx } from "class-variance-authority";
import React, { ComponentProps } from "react";
import { box, BoxProps } from "../Box";

const cardBase = cva("border-solid border-slate-300 rounded", {
	variants: {
		shadow: {
			md: "drop-shadow-md",
			lg: "drop-shadow-lg",
			xl: "drop-shadow-xl",
		},
	},
	defaultVariants: {
		shadow: "md",
	},
});

type CardBaseProps = VariantProps<typeof cardBase> & ComponentProps<"div">;

// eslint-disable-next-line prettier/prettier
export interface CardProps extends BoxProps, CardBaseProps {
	class?: string;
}

export const card = ({ margin, padding, shadow, className }: CardProps = {}) =>
	cx(box({ margin, padding }), cardBase({ shadow }), className);

export const Card: React.FC<CardProps> = ({
	children,
	className,
	margin,
	padding,
	shadow,
	...props
}) => (
	<div className={card({ margin, padding, shadow, className })} {...props}>
		{children}
	</div>
);
