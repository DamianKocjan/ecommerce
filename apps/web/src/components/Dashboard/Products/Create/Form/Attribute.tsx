import React from "react";
import { useFieldArray } from "react-hook-form";

import { X } from "@phosphor-icons/react";
import { Button } from "~/components/shared/core/Button";
import { Input } from "~/components/shared/forms/Input";
import { UseProductCreateForm } from "../useProductCreateForm";

interface Props {
	form: UseProductCreateForm["form"];
	index: number;
	handleRemove: () => void;
}

export const Attribute: React.FC<Props> = ({ form, index, handleRemove }) => {
	const valuesFieldArray = useFieldArray({
		control: form.control,
		name: `attributes.${index}.values`,
	});

	return (
		<div>
			<Input
				{...form.register(`attributes.${index}.name`)}
				label="Attribute name"
			/>

			<div className="flex flex-row flex-wrap gap-2">
				{valuesFieldArray.fields.map((value, valueIndex) => (
					<div key={`attribute-${index}-value-${valueIndex}`}>
						<Input
							{...form.register(
								`attributes.${index}.values.${valueIndex}.value`,
							)}
							label="Attribute value"
						/>

						<Button
							type="button"
							intent="secondary"
							onClick={() => valuesFieldArray.remove(valueIndex)}
						>
							<X />
						</Button>
					</div>
				))}

				<Button
					type="button"
					intent="secondary"
					onClick={() =>
						valuesFieldArray.append({
							value: "",
						})
					}
				>
					Add attribute value
				</Button>
			</div>

			<Button type="button" intent="secondary" onClick={handleRemove}>
				Remove attribute
			</Button>
		</div>
	);
};
