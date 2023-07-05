import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentProps } from "react";
import {
	FieldValues,
	FormProvider,
	SubmitHandler,
	UseFormReturn,
	useForm as _useForm,
	useFormContext,
	type UseFormProps,
} from "react-hook-form";
import { type TypeOf, type ZodSchema } from "zod";

type UseZodFormProps<T extends ZodSchema> = UseFormProps<TypeOf<T>> & {
	schema: T;
};

/** Wrapper of `react-hook-form` hook `useForm` with `zod` as validator */
export function useForm<T extends ZodSchema>({
	schema,
	...formConfig
}: UseZodFormProps<T>) {
	return _useForm({
		...formConfig,
		resolver: zodResolver(schema),
	});
}

interface FieldErrorProps {
	name?: string;
}

export function FieldError({ name }: FieldErrorProps) {
	const {
		formState: { errors },
	} = useFormContext();

	if (!name) return null;

	const error = errors[name];

	if (!error) return null;

	return (
		<div className="mt-1 text-sm font-semibold text-red-500">
			{String(error.message)}
		</div>
	);
}

interface Props<T extends FieldValues>
	extends Omit<ComponentProps<"form">, "onSubmit"> {
	form: UseFormReturn<T>;
	onSubmit: SubmitHandler<T>;
}

export const Form = <T extends FieldValues>({
	form,
	onSubmit,
	children,
	...props
}: Props<T>) => {
	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} {...props}>
				<fieldset
					className="flex flex-col space-y-4"
					disabled={form.formState.isSubmitting}
				>
					{children}
				</fieldset>
			</form>
		</FormProvider>
	);
};
