import { forwardRef } from "react";
import { LooseAutocomplete } from "../types";

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
					className="sr-only peer"
					name="size"
					type="radio"
					value={size.toLocaleLowerCase()}
					ref={ref}
					{...props}
				/>
				<div className="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
					{size}
				</div>
			</label>
		);
	}
);
