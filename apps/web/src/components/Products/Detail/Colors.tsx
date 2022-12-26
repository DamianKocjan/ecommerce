import { classNames } from "@/components/shared/utils";
import { InferQueryOutput } from "@/utils/trpc";
import { Flex } from "@ecommerce/ui";
import { RadioGroup } from "@headlessui/react";
import React from "react";

type Colors = InferQueryOutput<"product">["colors"];
type Color = Colors[number];

export interface ProductColorsProps {
	colors: Colors;
	selectedColor: Color;
	setSelectedColor: (color: Color) => void;
}

export const ProductColors: React.FC<ProductColorsProps> = ({
	colors,
	selectedColor,
	setSelectedColor,
}) => {
	return (
		<div>
			<h3 className="text-sm text-gray-600">Color</h3>

			<RadioGroup
				value={selectedColor}
				onChange={setSelectedColor}
				className="mt-2"
			>
				<RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
				<Flex items="center" wrap="wrap" className="max-w-xs gap-3">
					{colors.map((color) => (
						<RadioGroup.Option
							key={color.name}
							value={color}
							className={({ active, checked }) =>
								classNames(
									active && checked ? "ring ring-offset-1" : "",
									!active && checked ? "ring-2" : "",
									"-m-0.5 relative p-0.5 flex items-center justify-center cursor-pointer focus:outline-none"
								)
							}
						>
							<RadioGroup.Label as="p" className="sr-only">
								{color.name}
							</RadioGroup.Label>
							<span
								aria-hidden="true"
								className="h-8 w-8 border border-black border-opacity-10"
								style={{
									backgroundColor: color.name.toLocaleLowerCase(),
								}}
							/>
						</RadioGroup.Option>
					))}
				</Flex>
			</RadioGroup>
		</div>
	);
};
