import React from "react";
import { useFieldArray } from "react-hook-form";
import { Button } from "~/components/shared/core/Button";
import { Input } from "~/components/shared/forms/Input";
import { UseProductCreateForm } from "../useProductCreateForm";

interface Props {
	form: UseProductCreateForm["form"];
	handleRemoveSku: UseProductCreateForm["handleRemoveSku"];
	index: number;
}

export const Sku: React.FC<Props> = ({ form, handleRemoveSku, index }) => {
	const imagesFieldArray = useFieldArray({
		control: form.control,
		name: `skus.${index}.images`,
	});

	return (
		<div>
			<Button
				className="border-red-500"
				intent="secondary"
				type="button"
				onClick={() => handleRemoveSku(index)}
			>
				Remove sku
			</Button>

			<Input {...form.register(`skus.${index}.sku`)} label="SKU" />
			<Input {...form.register(`skus.${index}.title`)} label="Title" />
			<Input
				type="number"
				{...form.register(`skus.${index}.price`, {
					setValueAs: (value) => Number(value),
				})}
				label="Price"
			/>

			<hr />

			{imagesFieldArray.fields.length > 0 ? (
				<select
					{...form.register(`skus.${index}.thumbnailImage`, {
						setValueAs: (value) => Number(value),
					})}
				>
					{imagesFieldArray.fields.map((_, optionIndex) => (
						<option
							key={`sku-${index}-thumbnail-image-option-${optionIndex}`}
							value={optionIndex}
						>
							{optionIndex}
						</option>
					))}
				</select>
			) : null}

			<hr />

			{imagesFieldArray.fields.map((image, imageIndex) => (
				<div key={`skus.${index}.images.${imageIndex}`}>
					<Input
						type="text"
						{...form.register(`skus.${index}.images.${imageIndex}.url`)}
						label="Image"
					/>
					<Button
						type="button"
						intent="secondary"
						onClick={() => imagesFieldArray.remove(imageIndex)}
					>
						X
					</Button>
				</div>
			))}
			<Button
				type="button"
				intent="secondary"
				onClick={() =>
					imagesFieldArray.append({
						url: "",
					})
				}
			>
				Add image
			</Button>

			<hr />
		</div>
	);
};
