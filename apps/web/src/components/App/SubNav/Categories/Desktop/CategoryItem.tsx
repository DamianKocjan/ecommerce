import { Transition } from "@headlessui/react";
import Link from "next/link";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

export interface SubCategory {
	name: string;
	href: string;
}

export interface CategoryItemProps {
	name: string;
	href: string;
	image: string;
	columns: {
		subtitle: string;
		categories: SubCategory[];
	}[];
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
	name,
	href,
	columns,
	image,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLLIElement>(null);
	const leftOffset = useRef(0);
	// const width = useRef(1280);

	const handleMouseEnter = useCallback(() => setIsOpen(true), []);
	const handleMouseLeave = useCallback(() => setIsOpen(false), []);

	// calculating left offset based on `nav` and `li` left offset
	// FIXME: cannot do useLayoutEffect on ssr - https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
	// FIXME: sometimes leftOffset is not calculated
	useLayoutEffect(() => {
		if (ref.current) {
			const navElement = ref.current.parentElement?.parentElement;

			const navBoundingClientRect =
				navElement?.getBoundingClientRect() || new DOMRect();
			const liBoundingClientRect =
				ref.current?.getBoundingClientRect() || new DOMRect();

			leftOffset.current =
				liBoundingClientRect.left - navBoundingClientRect.left;
			// width.current = navBoundingClientRect.width;
		}
	}, []);

	//! NEEDS REFACTOR TODO: make this some sort of dialog/popup
	return (
		<li
			className="py-1 px-2 md:py-2 md:px-4 relative before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full hover:text-white hover:bg-black hover:before:bg-teal-400"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			ref={ref}
		>
			<Link href={href}>{name}</Link>
			<Transition
				show={isOpen}
				enter="transition-opacity transition-transform duration-75"
				enterFrom="-translate-y-4 opacity-0"
				enterTo="translate-y-0 opacity-100 block"
				leave="transition-opacity transition-transform duration-150"
				leaveFrom="translate-y-0 opacity-100"
				leaveTo="-translate-y-4 opacity-0 hidden"
				className="absolute left-0 right-0 w-[80rem] mt-4 z-30 max-h-full"
				style={{
					left: -leftOffset.current || 0,
					// width: `${width.current}px`,
				}}
			>
				<div className="flex p-4 relative before:absolute before:z-[-1] before:top-1 before:left-1 before:w-full before:h-full text-white bg-black before:bg-teal-400">
					<div className="flex w-3/4">
						{columns.map(({ categories, subtitle }) => (
							<div key={subtitle} className="w-full">
								<h3 className="text-lg hover:underline underline-offset-4 decoration-teal-400 decoration-2 mb-4">
									{subtitle}
								</h3>
								<ul className="pl-2">
									{categories.map(({ name, href }) => (
										<li
											key={name}
											className="my-2 hover:underline underline-offset-[3px] decoration-teal-400 decoration-2"
										>
											<Link href={href}>{name}</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
					<img
						src={image}
						alt=""
						className="block w-1/4 h-full object-cover"
						loading="lazy"
					/>
				</div>
			</Transition>
		</li>
	);
};
