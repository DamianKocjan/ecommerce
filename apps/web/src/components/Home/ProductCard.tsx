import { InferQueryOutput } from "@/utils/trpc";
import { Flex } from "@ecommerce/ui";
import Link from "next/link";
import React from "react";

export interface ProductCardProps {
	product: InferQueryOutput<"newProducts">["data"][number];
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	return (
		<Link href={`/products/${product.slug}`}>
			<a
				className="snap-start scroll-ml-6 shrink-0 relative gap-2 bg-black p-2 pb-4 max-w-[22rem]"
				draggable="false"
			>
				<Flex as="article" direction="col">
					<div className="relative group">
						<img
							src="https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png"
							alt={product.title}
							loading="lazy"
							className="w-auto h-36 sm:h-48 object-cover"
						/>
						<div className="absolute bottom-0 group-hover:bottom-1 transition-abs left-8 bg-black p-0.5 min-w-[3rem]">
							<p className="font-bold font-mono text-center text-white">
								${product.price}
							</p>
						</div>
					</div>
					<h4 className="text-2xl font-bold text-white py-2 line-clamp-2">
						{product.title}
					</h4>
				</Flex>
			</a>
		</Link>
	);
};
