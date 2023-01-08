import Link from "next/link";
import React from "react";

import { RouterOutputs } from "../../utils/trpc";
import { Flex } from "../shared/core/Flex";

export interface ProductCardProps {
	product: RouterOutputs["product"]["new"]["data"][number];
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	return (
		<Link href={`/products/${product.slug}`} legacyBehavior>
			<a
				className="group relative max-w-[22rem] shrink-0 snap-start scroll-ml-6 gap-2 bg-black p-2 pb-4"
				draggable="false"
			>
				<Flex as="article" direction="col">
					<div className="relative">
						<img
							src={product.thumbnailImage}
							alt={product.title}
							loading="lazy"
							className="h-36 w-auto object-cover sm:h-48"
						/>
						<div className="absolute bottom-0 left-8 min-w-[3rem] bg-black p-0.5 transition-abs group-hover:bottom-1">
							<p className="text-center font-mono font-bold text-white">
								${product.price}
							</p>
						</div>
					</div>
					<h4 className="line-clamp-2 py-2 text-2xl font-bold text-white">
						{product.title}
					</h4>
				</Flex>
			</a>
		</Link>
	);
};
