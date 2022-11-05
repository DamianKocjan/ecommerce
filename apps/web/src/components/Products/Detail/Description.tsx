import React from "react";

export interface ProductDescriptionProps {
	description: string;
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({
	description,
}) => {
	return (
		<div className="mt-12 px-4">
			<h2 className="text-2xl font-extrabold tracking-tight">Description</h2>
			<div className="mt-4 prose text-gray-700">{description}</div>
		</div>
	);
};
