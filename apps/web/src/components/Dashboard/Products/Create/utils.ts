import type { Sku } from "./schema";

type Attribute = {
	name: string;
	value: string;
};

function compareObjects<T>(a: T, b: T) {
	return JSON.stringify(a) === JSON.stringify(b);
}

export function createSkus(
	base: { title: string; price: number },
	currentSkus: Sku[],
	attributesList: {
		values: { value: string }[];
		name: string;
	}[],
	ignoredSkus: Sku[],
) {
	const skus = [] as Sku[];

	function generateSkuRecursively(
		attributeIndex: number,
		attributesSoFar: Attribute[],
	) {
		if (attributeIndex === attributesList.length) {
			const sku = currentSkus.find((sku) => {
				return compareObjects(sku.attributes, attributesSoFar);
			});

			if (sku) {
				const copy = { ...sku };

				if (!copy.title) {
					copy.title = base.title;
				}
				if (!copy.price) {
					copy.price = base.price;
				}

				skus.push(copy);
				return;
			}
			skus.push({
				sku: "",
				title: base.title,
				price: base.price,
				thumbnailImage: 0,
				images: [],
				attributes: attributesSoFar,
			});
			return;
		}

		const attribute = attributesList[attributeIndex];
		if (!attribute) {
			return;
		}

		for (const value of attribute.values) {
			generateSkuRecursively(attributeIndex + 1, [
				...attributesSoFar,
				{
					name: attribute.name,
					value: value.value,
				},
			]);
		}
	}

	generateSkuRecursively(0, []);

	return skus.filter((sku) => {
		return !ignoredSkus.some((ignoredSku) => {
			return compareObjects(ignoredSku.attributes, sku.attributes);
		});
	});
}
