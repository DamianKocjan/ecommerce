import { cn, withRef } from "@udecode/cn";
import { PlateLeaf } from "@udecode/plate-common";

export const HighlightLeaf = withRef<typeof PlateLeaf>(
	({ children, className, ...props }, ref) => (
		<PlateLeaf
			asChild
			className={cn("bg-primary/20 dark:bg-primary/40 text-inherit", className)}
			ref={ref}
			{...props}
		>
			<mark>{children}</mark>
		</PlateLeaf>
	),
);
