import { trpc } from "@/utils/trpc";
import { Flex } from "@ecommerce/ui";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { ProductCard } from "./ProductCard";

export const NewProducts: React.FC = () => {
	const { data } = trpc.useQuery(["newProducts", { perPage: 15 }], {
		refetchOnWindowFocus: false,
	});
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const [isMouseDown, setIsMouseDown] = useState(false);
	const ref = React.useRef<HTMLDivElement>(null);

	const handleMouseDown = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			setIsMouseDown(true);
			ref.current?.classList.remove("snap-x");
			setStartX(e.pageX - ref.current?.offsetLeft!);
			setScrollLeft(ref.current?.scrollLeft!);
		},
		[ref]
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
			if (!isMouseDown) {
				return;
			}

			e.preventDefault();

			const x = e.pageX - ref.current?.offsetLeft!;
			const walkX = (x - startX) * 2;

			ref.current!.scrollLeft = scrollLeft - walkX;
		},
		[isMouseDown, startX, scrollLeft, ref]
	);

	return (
		<section className="mt-4">
			<h3 className="text-5xl lg:text-6xl p-8 font-mono font-semibold mb-2 relative group w-fit">
				<Link href="/c/new">Latest products</Link>
				<span className="h-2 w-full bg-black absolute bottom-4 left-16 scale-x-0 group-hover:animate-strikeThrough" />
			</h3>
			<Flex
				className="w-full gap-8 snap-x overflow-x-auto p-6 pb-2 sm:scrollbar-thin"
				ref={ref}
				onMouseDown={handleMouseDown}
				onMouseLeave={handleMouseLeave}
				onMouseUp={handleMouseUp}
				onMouseMove={handleMouseMove}
			>
				{data?.data.map((product) => (
					<ProductCard product={product} key={product.slug} />
				))}
			</Flex>
		</section>
	);
};
