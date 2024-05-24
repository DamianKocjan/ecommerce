import React from "react";

import { Input } from "~/components/shared/forms/Input";
import { UseProductCreateForm } from "../useProductCreateForm";

interface Props {
	form: UseProductCreateForm["form"];
}

export const Basic: React.FC<Props> = ({ form }) => {
	const isMultiPack = form.watch("multiPack");
	const skus = form.watch("skus");

	return (
		<div>
			<Input {...form.register("title")} label="Title" />
			<Input {...form.register("description")} label="Description" />
			<Input {...form.register("shortDescription")} label="Short description" />

			<hr />

			<input {...form.register("multiPack")} type="checkbox" />
			{isMultiPack ? (
				<Input
					{...form.register("multiPackQuantity", {
						setValueAs: (value) => Number(value),
					})}
					type="number"
					label="Multi pack quantity"
				/>
			) : null}

			<hr />

			<select {...form.register("season")}>
				<option value="SPRING">Spring</option>
				<option value="SUMMER">Summer</option>
				<option value="AUTUMN">Autumn</option>
				<option value="WINTER">Winter</option>
				<option value="ALL">All</option>
			</select>

			<hr />

			<Input
				{...form.register("price", {
					setValueAs: (value) => Number(value),
				})}
				type="number"
				label="Price"
			/>

			<hr />

			{skus && skus.length > 0 ? (
				<>
					<select
						{...form.register("defaultVariant", {
							setValueAs: (value) => Number(value),
						})}
					>
						{skus.map((_, index) => (
							<option key={`default-variant-${index}`} value={index}>
								{index}
							</option>
						))}
					</select>
					<hr />
				</>
			) : null}
		</div>
	);
};
