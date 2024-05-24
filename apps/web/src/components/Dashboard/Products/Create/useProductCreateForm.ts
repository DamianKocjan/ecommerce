import { useEffect, useMemo, useState } from "react";
import { useWatch } from "react-hook-form";

import { useForm } from "~/components/shared/forms/Form";
import { productCreateSchema, type Attribute, type Sku } from "./schema";
import { createSkus } from "./utils";

export function useProductCreateForm() {
	const form = useForm({
		schema: productCreateSchema,
		defaultValues: {
			season: "ALL",
			multiPackQuantity: 1,
		},
	});
	const [ignoredSkus, setIgnoredSkus] = useState<Sku[]>([]);
	const attributes = useWatch({
		control: form.control,
		name: ["attributes", "title", "price"],
	});

	// TODO: there's should be a better way to do this
	const allAttributes = useWatch({
		control: form.control,
		name:
			(
				attributes?.[0]?.map((_, i) => [
					`attributes.${i}`,
					`attributes.${i}.values`,
				]) as [`attributes.${number}`, `attributes.${number}.values`][]
			)?.flat() ?? "attributes",
	});

	const filteredAttributes = useMemo(
		() =>
			allAttributes?.filter((attr) => "name" in attr) as
				| Attribute[]
				| undefined,
		[allAttributes],
	);

	// TODO: there's should be a better way to do this
	// TODO: add ability to remove attributes from skus
	// On added attributes create skus for each attribute value
	useEffect(() => {
		function createSkusFromAttributes() {
			if (filteredAttributes) {
				const currentSkus = form.getValues("skus");
				const title = form.getValues("title");
				const price = form.getValues("price");
				const base = {
					title,
					price,
				};

				// create skus with unique set of attributes
				form.setValue(
					"skus",
					createSkus(base, currentSkus, filteredAttributes, ignoredSkus),
				);
			}
		}

		// throttle to prevent too many calls
		const handle = setTimeout(createSkusFromAttributes, 500);
		return () => clearTimeout(handle);
	}, [form, filteredAttributes, ignoredSkus]);

	const handleRemoveSku = (index: number) => {
		// remove sku and add it to ignored skus
		const sku = form.getValues(`skus.${index}`);

		setIgnoredSkus((prev) => [...new Set([...prev, sku])]);
	};

	return {
		form,
		handleRemoveSku,
	};
}

export type UseProductCreateForm = ReturnType<typeof useProductCreateForm>;
export type SubmitHandler = Parameters<
	UseProductCreateForm["form"]["handleSubmit"]
>[0];
