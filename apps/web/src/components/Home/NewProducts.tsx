import Link from "next/link";
import React, { useCallback, useState } from "react";

import { Grid } from "~/components/shared/core/Grid";
import { trpc } from "~/utils/trpc";
import { ProductCard, ProductCardShimmer } from "./ProductCard";

export const NewProducts: React.FC = () => {
	const { data, isLoading } = trpc.product.new.useQuery(
		{ perPage: 15 },
		{
			refetchOnWindowFocus: false,
		},
	);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const [isMouseDown, setIsMouseDown] = useState(false);
	const ref = React.useRef<HTMLDivElement>(null);

	const handleMouseDown = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!ref.current) {
				return;
			}

			setIsMouseDown(true);
			ref.current?.classList.remove("snap-x");
			setStartX(e.pageX - ref.current?.offsetLeft);
			setScrollLeft(ref.current?.scrollLeft);
		},
		[ref],
	);

	const handleMouseUp = useCallback(() => {
		setIsMouseDown(false);
		ref.current?.classList.add("snap-x");
	}, [ref]);

	const handleMouseLeave = useCallback(() => {
		setIsMouseDown(false);
		ref.current?.classList.add("snap-x");
	}, [ref]);

	// TODO: make it more easier to use for users
	const handleMouseMove = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isMouseDown || !ref.current) {
				return;
			}

			e.preventDefault();

			const x = e.pageX - ref.current.offsetLeft;
			const walkX = (x - startX) * 2;

			ref.current.scrollLeft = scrollLeft - walkX;
		},
		[isMouseDown, startX, scrollLeft, ref],
	);

	if (!data && !isLoading) {
		return null;
	}
	return (
		<section className="mt-4">
			<h3 className="group relative mb-2 w-fit p-8 font-mono text-5xl font-semibold lg:text-6xl">
				<Link href="/c/new">Latest products</Link>
				<span className="absolute bottom-4 left-16 h-2 w-full scale-x-0 bg-black group-hover:animate-strikeThrough" />
			</h3>
			{isLoading ? (
				<Grid className="auto-cols-max grid-flow-col gap-4 overflow-x-hidden p-2">
					{[...(Array(15) as unknown[])].map((_, i) => (
						<ProductCardShimmer key={i} />
					))}
				</Grid>
			) : (
				<Grid
					className="sm:scrollbar-thin snap-x auto-cols-max grid-flow-col gap-4 overflow-x-auto p-2"
					ref={ref}
					onMouseDown={handleMouseDown}
					onMouseLeave={handleMouseLeave}
					onMouseUp={handleMouseUp}
					onMouseMove={handleMouseMove}
				>
					{data?.data.map((product) => (
						<ProductCard product={product} key={product.slug} />
					))}
				</Grid>
			)}
		</section>
	);
};
