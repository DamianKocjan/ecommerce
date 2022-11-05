import { IconButton } from "@ecommerce/ui";
import { useState } from "react";
import { AddToBagButton } from "../Bag";
import { useCurrencyFormatter } from "../formatters";
import { BuyButton } from "./BuyButton";
import { Size, SizeInput } from "./SizeInput";

export interface ProductCardProps {
	title: string;
	price: number;
	image: string;
	sizes: Set<Size>;
	inStock: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
	title,
	price,
	image,
	sizes,
	inStock,
}) => {
	const [selectedSize, setSelectedSize] = useState<number>(0);
	const formatCurrency = useCurrencyFormatter();

	const handleSizeChange = (i: number) => {
		setSelectedSize(i);
	};

	return (
		<div className="flex p-6 font-mono">
			<div className="flex-none w-48 mb-10 relative z-10 before:absolute before:top-1 before:left-1 before:w-full before:h-full before:bg-teal-400">
				<img
					src={image}
					alt="Product image"
					className="absolute z-10 inset-0 w-full h-full object-cover"
					loading="lazy"
				/>
			</div>
			<form className="flex-auto pl-6">
				<div className="relative flex flex-wrap items-baseline pb-6 before:bg-black before:absolute before:-top-6 before:bottom-0 before:-left-60 before:-right-6">
					<h1 className="relative w-full flex-none mb-2 text-2xl font-semibold text-white">
						{title}
					</h1>
					<div className="relative text-lg text-white">
						{formatCurrency.format(price)}
					</div>
					{inStock && (
						<div className="relative uppercase text-teal-400 ml-3">
							In stock
						</div>
					)}
				</div>
				<div className="flex items-baseline my-6">
					<div className="space-x-3 flex text-sm font-medium">
						{Array.from(sizes).map((size, i) => (
							<SizeInput
								key={`${size}-${i}`}
								size={size}
								checked={i === selectedSize}
								onChange={() => handleSizeChange(i)}
							/>
						))}
					</div>
				</div>
				<div className="flex space-x-2 mb-4 text-sm font-medium">
					<div className="flex space-x-4">
						<BuyButton
							disabled={!inStock}
							product={{ slug: "1", price, quantity: 1 }}
						/>
						<AddToBagButton product="1" />
					</div>
					<IconButton type="button" intent="secondary" aria-label="Like">
						<svg width="20" height="20" fill="currentColor" aria-hidden="true">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
							/>
						</svg>
					</IconButton>
				</div>
				<p className="text-xs leading-6 text-slate-500">
					Free shipping on all continental US orders.
				</p>
			</form>
		</div>
	);
};
