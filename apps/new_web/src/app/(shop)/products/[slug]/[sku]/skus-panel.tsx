"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { CartButton } from "~/components/shop/cart-button";
import { WishlistButton } from "~/components/shop/wishlist-button";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/utils";
import type { Product } from "./types";

export function SkusPanel({
	productSlug,
	skus,
	currentSku,
}: {
	productSlug: Product["slug"];
	skus: Product["skus"];
	currentSku: Product["skus"][number];
}) {
	const { attributes, shouldShowSkusPanel } = useAttributes(skus);
	const router = useRouter();

	const handleSkuChange = React.useCallback(
		(attributeId: number, value: string) => {
			// 1. Find skus that have the same attribute value
			const filteredSkus = skus.filter((sku) =>
				sku.attributes.some(
					(a) => a.attribute.id === attributeId && a.value === value,
				),
			);

			// 2. Find the common attributes between the filtered skus and the current sku
			const commonAttributes = filteredSkus.reduce(
				(acc, sku) => {
					const skuAttributes = sku.attributes.map((a) => a.attribute.id);
					return acc.filter((id) => skuAttributes.includes(id));
				},
				currentSku.attributes.map((a) => a.attribute.id),
			);

			// 3. Order the skus by the most compatible with the current sku
			const newSkus = filteredSkus.sort((a, b) => {
				const aScore = a.attributes.filter((attr) =>
					commonAttributes.includes(attr.attribute.id),
				).length;
				const bScore = b.attributes.filter((attr) =>
					commonAttributes.includes(attr.attribute.id),
				).length;

				return bScore - aScore;
			});

			// 4. Redirect to the first sku that has the common attributes
			if (newSkus.length > 0) {
				router.push(`/products/${productSlug}/${newSkus[0]!.sku}`);
			}
		},
		[currentSku.attributes, productSlug, router, skus],
	);

	const willChangeOtherAttributes = React.useCallback(
		(attributeId: number, value: string) => {
			const newSku = skus.find((sku) =>
				sku.attributes.some(
					(a) => a.attribute.id === attributeId && a.value === value,
				),
			);

			if (!newSku) {
				return false;
			}

			const commonAttributes = newSku.attributes
				// Filter out attributes that are not in attributesWithValues
				.filter((a) => attributes.some((attr) => attr.id === a.attribute.id))
				.map((a) => a.attribute.id);

			return (
				commonAttributes.length !==
				currentSku.attributes.filter(
					(a) =>
						attributes.some((attr) => attr.id === a.attribute.id) &&
						commonAttributes.includes(a.attribute.id),
				).length
			);
		},
		[attributes, currentSku.attributes, skus],
	);

	return (
		<div className="grid gap-4">
			{shouldShowSkusPanel
				? attributes.map((attr) => (
						<div key={`attr-${attr.id}`} className="grid gap-2">
							<Label htmlFor={String(attr.id)} className="text-base">
								{attr.name}
							</Label>
							<RadioGroup
								id={String(attr.id)}
								defaultValue={
									currentSku.attributes.find(
										(a) => a.attribute.name === attr.name,
									)?.value
								}
								className="flex items-center gap-2"
							>
								{attr.values.map((value) => (
									<Label
										key={`attr-val-${value.id}`}
										htmlFor={String(value.id)}
										onClick={() => handleSkuChange(attr.id, value.name)}
										className={cn(
											"flex cursor-pointer items-center gap-2 rounded-md border p-2",
											{
												// if the current sku has this attribute value selected
												"border-2 border-solid": currentSku.attributes.some(
													(a) =>
														a.attribute.name === attr.name &&
														a.value === value.name,
												),
												// if this attribute will change the more attributes than this one
												"border-dashed": willChangeOtherAttributes(
													attr.id,
													value.name,
												),
											},
										)}
									>
										<RadioGroupItem id={String(value.id)} value={value.name} />
										{value.name}
									</Label>
								))}
							</RadioGroup>
						</div>
					))
				: null}

			<ProductActions stock={currentSku.stock} productSkuId={currentSku.id} />
		</div>
	);
}

function useAttributes(skus: Product["skus"]) {
	const attributes = React.useMemo(() => {
		type Id = number;
		type Value = {
			name: string;
			values: {
				id: number;
				name: string;
			}[];
		};
		const attributes = new Map<Id, Value>();

		skus.forEach((sku) => {
			sku.attributes.forEach((attributeValue) => {
				const id = attributeValue.attribute.id;
				const attribute = attributes.get(id);
				const attrVal = {
					id: attributeValue.id,
					name: attributeValue.value,
				};

				if (attribute && !attribute.values.find((v) => v.id === attrVal.id)) {
					attribute.values.push(attrVal);
				} else {
					attributes.set(id, {
						name: attributeValue.attribute.name,
						values: [attrVal],
					});
				}
			});
		});

		// convert to array
		return (
			Array.from(attributes.entries())
				.map(([id, value]) => ({
					id,
					name: value.name,
					values: Array.from(value.values),
				}))
				// filter out attributes that have only one value
				.filter((attr) => attr.values.length > 1)
		);
	}, [skus]);

	const shouldShowSkusPanel = React.useMemo(
		() =>
			attributes.reduce((acc, attr) => acc + attr.values.length, 0) >
			attributes.length,
		[attributes],
	);

	return { attributes, shouldShowSkusPanel };
}

function ProductActions({
	stock,
	productSkuId,
}: {
	stock: number;
	productSkuId: number;
}) {
	const [quantity, setQuantity] = React.useState(1);

	return (
		<>
			<div className="grid gap-2">
				<Label htmlFor="quantity" className="text-base">
					Quantity
				</Label>
				<Select
					value={String(quantity)}
					onValueChange={(value) => setQuantity(Number(value))}
					disabled={stock === 0}
				>
					<SelectTrigger className="w-24" title={`${stock} available`}>
						<SelectValue placeholder="Select" />
					</SelectTrigger>
					<SelectContent>
						{stock === 0 ? <SelectItem value="1">---</SelectItem> : null}
						{Array.from({ length: stock > 5 ? 5 : stock }, (_, i) => (
							<SelectItem key={i} value={String(i + 1)}>
								{i + 1}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="flex flex-col gap-2 min-[400px]:flex-row">
				<CartButton
					productSkuId={productSkuId}
					quantity={quantity}
					disabled={stock === 0}
				/>
				<WishlistButton productSkuId={productSkuId} />
			</div>
		</>
	);
}
