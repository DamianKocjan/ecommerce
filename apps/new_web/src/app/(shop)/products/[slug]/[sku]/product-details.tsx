"use client";

import { Separator } from "~/components/ui/separator";
import { H1 } from "~/components/ui/typography";
import { useCurrencyFormatter } from "~/hooks/use-formatter";
import { Rating } from "./rating";
import { SkusPanel } from "./skus-panel";
import type { Product } from "./types";

export function ProductDetails({
	product,
	sku,
}: {
	product: Product;
	sku: string;
}) {
	const formatter = useCurrencyFormatter();

	const productSku = product.skus.find((s) => s.sku === sku)!;

	const formattedPrice = formatter.format(productSku.price);

	return (
		<div>
			<div className="grid gap-4 md:gap-8">
				<div className="grid gap-2">
					<H1>{product.title}</H1>
					<div className="flex items-center gap-4">
						<Rating rating={product.rating} />

						<div className="text-4xl font-bold">{formattedPrice}</div>
					</div>
					<div>
						<p>{product.shortDescription}</p>
					</div>
				</div>

				<SkusPanel
					productSlug={product.slug}
					skus={product.skus}
					currentSku={productSku}
				/>

				<Separator />

				<div
					className="prose-invert max-w-none"
					dangerouslySetInnerHTML={{ __html: product.description }}
				/>
			</div>
		</div>
	);
}
