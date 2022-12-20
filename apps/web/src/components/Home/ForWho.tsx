import { Grid } from "@ecommerce/ui";
import Link from "next/link";
import React from "react";

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
			<h3 className="font-mono font-semibold text-5xl lg:text-6xl p-8 sm:p-0">
				For who are you buying?
			</h3>
			<Grid
				direction="col"
				cols="1"
				items="stretch"
				justify="center"
				className="p-4 gap-4 w-full mt-2 sm:grid-cols-2 lg:grid-cols-3"
			>
				{/* FIXME: fix last card max height on smaller screens */}
				{/* FIXME: fix first two width on smaller screens */}
				{FOR_WHO.map(({ title, imageSrc, href }) => (
					<Link href={href}>
						<a className="group bg-black p-4 last-of-type:sm:col-span-2 last-of-type:sm:place-self-center last-of-type:lg:col-span-1">
							<article>
								<img
									src={imageSrc}
									alt="women"
									className="object-cover grayscale group-hover:grayscale-0 transition-filter last-of-type:sm:max-h-96 last-of-type:md:max-h-fit"
								/>
								<h4 className="text-4xl font-bold font-mono text-white py-2 relative w-fit">
									{title}
									<span className="absolute bottom-0 left-4 hidden group-hover:block w-full h-1 bg-white" />
								</h4>
							</article>
						</a>
					</Link>
				))}
			</Grid>
		</section>
	);
};
