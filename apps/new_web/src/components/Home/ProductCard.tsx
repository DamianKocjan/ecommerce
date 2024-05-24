import Link from "next/link";
import React from "react";

import { Flex } from "~/components/shared/core/Flex";
import { Shimmer } from "~/components/shared/core/Shimmer";
import { RouterOutputs } from "~/utils/trpc";

export interface ProductCardProps {
	product: RouterOutputs["product"]["new"]["data"][number];
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	return (
		<Link
			href={`/products/${product.slug}`}
			className="group relative snap-start scroll-ml-6 bg-black p-2 pb-4"
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
		</Link>
	);
};

export const ProductCardShimmer: React.FC = () => {
	return (
		<div className="relative bg-black p-2 pb-4">
			<Flex as="article" direction="col">
				<div className="relative">
					<Shimmer
						shape="rectangular"
						className="h-36 w-64 bg-white/25 sm:h-48"
					/>
					<div className="absolute bottom-0 left-8 min-w-[3rem] bg-black p-0.5">
						<Shimmer shape="text" className="bg-white/25">
							&nbsp;
						</Shimmer>
					</div>
				</div>

				<Shimmer shape="text" className="my-2 h-6 bg-white/25" />
			</Flex>
		</div>
	);
};
