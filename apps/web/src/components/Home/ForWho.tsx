import Link from "next/link";
import React from "react";

import { Grid } from "../shared/core/Grid";

const FOR_WHO = [
	{
		title: "For Women",
		imageSrc:
			"https://tailwindcss.com/_next/static/media/retro-shoe.24e25785.jpg",
		href: "/c/women",
	},
	{
		title: "For Men",
		imageSrc:
			"https://tailwindcss.com/_next/static/media/retro-shoe.24e25785.jpg",
		href: "/c/men",
	},
	{
		title: "For Kids",
		imageSrc:
			"https://tailwindcss.com/_next/static/media/retro-shoe.24e25785.jpg",
		href: "/c/kids",
	},
] as const;

export const ForWho: React.FC = () => {
	return (
		<section className="mt-16">
			<h3 className="p-8 font-mono text-5xl font-semibold sm:p-0 lg:text-6xl">
				For who are you buying?
			</h3>
			<Grid
				cols="1"
				items="stretch"
				justify="center"
				className="mt-2 w-full gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3"
			>
				{/* FIXME: fix last card max height on smaller screens */}
				{/* FIXME: fix first two width on smaller screens */}
				{FOR_WHO.map(({ title, imageSrc, href }) => (
					<Link
						key={`for-who-${title}`}
						className="group bg-black p-4 last-of-type:sm:col-span-2 last-of-type:sm:place-self-center last-of-type:lg:col-span-1"
						href={href}
					>
						<article>
							<img
								src={imageSrc}
								alt={title}
								loading="lazy"
								className="object-cover grayscale transition-filter group-hover:grayscale-0 last-of-type:sm:max-h-96 last-of-type:md:max-h-fit"
							/>
							<h4 className="relative w-fit py-2 font-mono text-4xl font-bold text-white">
								{title}
								<span className="absolute bottom-0 left-4 hidden h-1 w-full bg-white group-hover:block" />
							</h4>
						</article>
					</Link>
				))}
			</Grid>
		</section>
	);
};
