import React from "react";
import { useFieldArray } from "react-hook-form";

import { Button } from "~/components/shared/core/Button";
import { UseProductCreateForm } from "../useProductCreateForm";
import { Attribute } from "./Attribute";

interface Props {
	form: UseProductCreateForm["form"];
}

export const Attributes: React.FC<Props> = ({ form }) => {
	const attributesFieldArray = useFieldArray({
		control: form.control,
		name: "attributes",
	});

	return (
		<div>
			{attributesFieldArray.fields.map((field, index) => (
				<Attribute
					key={`attribute-${index}`}
					form={form}
					index={index}
					handleRemove={() => attributesFieldArray.remove(index)}
				/>
			))}

			<Button
				type="button"
				intent="secondary"
				onClick={() =>
					attributesFieldArray.append({
						name: "",
						values: [
							{
								value: "",
							},
						],
					})
				}
			>
				Add attribute
			</Button>

			<hr />
		</div>
	);
};
