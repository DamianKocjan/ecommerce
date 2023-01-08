import { useState } from "react";

import { Flex } from "../../core/Flex";
import { IconButton } from "../../core/IconButton";
import { useCurrencyFormatter } from "../../hooks/useCurrencyFormatter";
import { AddToBagButton } from "../Bag";
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
		<Flex className="p-6 font-mono">
			<div className="relative z-10 mb-10 w-48 flex-none before:absolute before:top-1 before:left-1 before:h-full before:w-full before:bg-teal-400">
				<img
					src={image}
					alt="Product image"
					className="absolute inset-0 z-10 h-full w-full object-cover"
					loading="lazy"
				/>
			</div>
			<form className="flex-auto pl-6">
				<Flex
					items="baseline"
					wrap="wrap"
					className="relative pb-6 before:absolute before:-top-6 before:bottom-0 before:-left-60 before:-right-6 before:bg-black"
				>
					<h1 className="relative mb-2 w-full flex-none text-2xl font-semibold text-white">
						{title}
					</h1>
					<div className="relative text-lg text-white">
						{formatCurrency.format(price)}
					</div>
					{inStock && (
						<div className="relative ml-3 uppercase text-teal-400">
							In stock
						</div>
					)}
				</Flex>
				<Flex items="baseline" className="my-6">
					<Flex className="space-x-3 text-sm font-medium">
						{Array.from(sizes).map((size, i) => (
							<SizeInput
								key={`${size}-${i}`}
								size={size}
								checked={i === selectedSize}
								onChange={() => handleSizeChange(i)}
							/>
						))}
					</Flex>
				</Flex>
				<Flex className="mb-4 space-x-2 text-sm font-medium">
					<Flex className="space-x-4">
						<BuyButton
							disabled={!inStock}
							product={{ slug: "1", price, quantity: 1 }}
						/>
						<AddToBagButton productSlug="1" />
					</Flex>
					<IconButton type="button" intent="secondary" aria-label="Like">
						<svg width="20" height="20" fill="currentColor" aria-hidden="true">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
							/>
						</svg>
					</IconButton>
				</Flex>
				<p className="text-xs leading-6 text-slate-500">
					Free shipping on all continental US orders.
				</p>
			</form>
		</Flex>
	);
};
