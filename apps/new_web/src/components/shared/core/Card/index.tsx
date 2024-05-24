import { cva, cx, type VariantProps } from "class-variance-authority";
import React, { type ComponentProps } from "react";

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
	<div
		className={card({ margin, padding, shadow, class: className })}
		{...props}
	>
		{children}
	</div>
);
