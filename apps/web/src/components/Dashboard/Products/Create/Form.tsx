import { DevTool } from "@hookform/devtools";
import React from "react";

import { Button } from "~/components/shared/core/Button";
import { Form } from "~/components/shared/forms/Form";
import { Attributes } from "./Form/Attributes";
import { Basic } from "./Form/Basic";
import { Skus } from "./Form/Skus";
import type {
	SubmitHandler,
	UseProductCreateForm,
} from "./useProductCreateForm";

interface Props extends UseProductCreateForm {
	onSubmit: SubmitHandler;
}

export const ProductCreateForm: React.FC<Props> = ({
	form,
	onSubmit,
	handleRemoveSku,
}) => {
	return (
		<Form form={form} onSubmit={onSubmit}>
			<DevTool control={form.control} />
			<Basic form={form} />

			<Attributes form={form} />

			<Skus form={form} handleRemoveSku={handleRemoveSku} />

			<Button intent="secondary" type="submit">
				Submit
			</Button>
		</Form>
	);
};
