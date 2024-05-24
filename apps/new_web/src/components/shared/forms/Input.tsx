import { Icon } from "@phosphor-icons/react";
import { cx } from "class-variance-authority";
import { forwardRef, useId, type ComponentProps } from "react";

import { FieldError } from "./Form";

export interface InputProps
	extends Omit<ComponentProps<"input">, "id" | "className" | "ref"> {
	leftIcon?: Icon;
	rightIcon?: Icon;
	label: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
	{ leftIcon: LeftIcon, label, rightIcon: RightIcon, ...props },
	ref,
) {
	const id = useId();

	if (LeftIcon && RightIcon) {
		throw new Error("Input can only have one icon");
	}
	return (
		<div>
			<label htmlFor={id}>
				<span className="block text-sm font-medium text-gray-700">{label}</span>
			</label>
			<div className="relative mt-1 w-full cursor-default overflow-hidden border border-black bg-white text-left focus-within:border-teal-300 focus-within:ring focus-within:ring-white focus-within:ring-opacity-75 focus-within:ring-offset-1 focus-within:ring-offset-teal-300 focus:outline-none sm:text-sm">
				{LeftIcon ? (
					<span className="absolute inset-y-0 left-0 flex items-center pl-2">
						<LeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
					</span>
				) : null}

				<input
					id={id}
					className={cx(
						"w-full border-none py-2 text-sm leading-5 text-gray-900 focus:ring-0",
						!LeftIcon && !RightIcon && "pl-3",
						LeftIcon && "pl-10 pr-3",
						RightIcon && "pl-3 pr-10",
					)}
					ref={ref}
					{...props}
				/>

				{RightIcon ? (
					<span className="absolute inset-y-0 right-0 flex items-center pr-2">
						<RightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
					</span>
				) : null}
			</div>

			<FieldError name={props.name} />
		</div>
	);
});
