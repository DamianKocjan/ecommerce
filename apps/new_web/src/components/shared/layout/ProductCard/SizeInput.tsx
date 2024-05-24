import { forwardRef } from "react";

import { Flex } from "~/components/shared/core/Flex";
import { type LooseAutocomplete } from "~/utils/types";

export type Size = LooseAutocomplete<"XS" | "S" | "M" | "L" | "XL">;

export interface SizeInputProps
	extends Omit<React.ComponentProps<"input">, "size" | "type"> {
	size: Size;
}

export const SizeInput = forwardRef<HTMLInputElement, SizeInputProps>(
	function Input({ size, ...props }, ref) {
		return (
			<label className="cursor-pointer">
				<input
					className="peer sr-only"
					name="size"
					type="radio"
					value={size.toLocaleLowerCase()}
					ref={ref}
					{...props}
				/>
				<Flex
					items="center"
					justify="center"
					className="relative h-10 w-10 text-black before:absolute before:left-0.5 before:top-0.5 before:z-[-1] before:h-full before:w-full peer-checked:bg-black peer-checked:text-white peer-checked:before:bg-teal-400"
				>
					{size}
				</Flex>
			</label>
		);
	},
);
