import { cn, withRef } from "@udecode/cn";
import { PlateElement, useElement } from "@udecode/plate-common";
import { type TLinkElement, useLink } from "@udecode/plate-link";

export const LinkElement = withRef<typeof PlateElement>(
	({ children, className, ...props }, ref) => {
		const element = useElement<TLinkElement>();
		const { props: linkProps } = useLink({ element });

		return (
			<PlateElement
				asChild
				className={cn(
					"text-primary decoration-primary font-medium underline underline-offset-4",
					className,
				)}
				ref={ref}
				{...(linkProps as object)}
				{...props}
			>
				<a>{children}</a>
			</PlateElement>
		);
	},
);
