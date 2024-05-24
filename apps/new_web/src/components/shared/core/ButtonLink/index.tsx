import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { type ComponentProps } from "react";

const buttonLink = cva(
	"flex items-center justify-center px-6 h-12 uppercase font-semibold tracking-wider border",
	{
		variants: {
			intent: {
				primary: "border-black bg-teal-400",
				secondary: "border-slate-200",
			},
			textColor: {
				light: "text-gray-300 hover:text-white",
				dark: "text-slate-900 hover:text-black",
			},
			fullWidth: {
				true: "w-full",
				false: "w-fit",
			},
		},
		defaultVariants: {
			intent: "primary",
			fullWidth: false,
			textColor: "dark",
		},
	},
);

export type ButtonLinkProps = VariantProps<typeof buttonLink> &
	ComponentProps<typeof Link>;

export const ButtonLink: React.FC<ButtonLinkProps> = ({
	className,
	intent,
	fullWidth,
	textColor,
	...props
}) => {
	return (
		<Link
			className={buttonLink({ intent, fullWidth, textColor, class: className })}
			{...props}
		/>
	);
};
