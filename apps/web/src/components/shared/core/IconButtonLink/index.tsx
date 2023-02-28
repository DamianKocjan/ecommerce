import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import React from "react";

const iconButtonLink = cva(
	"flex-none flex items-center justify-center w-12 h-12",
	{
		variants: {
			intent: {
				primary: "text-teal-400",
				secondary: "text-black",
				light: "text-gray-300",
			},
		},
		defaultVariants: {
			intent: "primary",
		},
	},
);

export type IconButtonLinkProps = VariantProps<typeof iconButtonLink> &
	React.ComponentProps<typeof Link>;

export const IconButtonLink: React.FC<IconButtonLinkProps> = ({
	className,
	children,
	intent,
	...props
}) => {
	return (
		<Link className={iconButtonLink({ intent, class: className })} {...props}>
			{children}
		</Link>
	);
};
