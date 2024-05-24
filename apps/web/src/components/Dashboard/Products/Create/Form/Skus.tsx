import React from "react";
import { useFieldArray } from "react-hook-form";

import { UseProductCreateForm } from "../useProductCreateForm";
import { Sku } from "./Sku";

interface Props {
	form: UseProductCreateForm["form"];
	handleRemoveSku: UseProductCreateForm["handleRemoveSku"];
}

export const Skus: React.FC<Props> = ({ form, handleRemoveSku }) => {
	const skusFieldArray = useFieldArray({
		control: form.control,
		name: "skus",
	});

	return (
		<div>
			{skusFieldArray.fields.map((field, index) => (
				<Sku
					key={`sku-${index}`}
					form={form}
					handleRemoveSku={handleRemoveSku}
					index={index}
				/>
			))}
		</div>
	);
};
