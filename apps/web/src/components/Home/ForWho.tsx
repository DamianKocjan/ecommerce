import { Grid } from "@ecommerce/ui";
import Link from "next/link";
import React from "react";

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
				<Link href="/c/women">
					<a className="group bg-black p-4">
						<article>
							<img
								src="https://tailwindcss.com/_next/static/media/retro-shoe.24e25785.jpg"
								alt="women"
								className="object-cover grayscale group-hover:grayscale-0 transition-filter"
							/>
							<h4 className="text-4xl font-bold font-mono text-white py-2">
								For Women
							</h4>
						</article>
					</a>
				</Link>
				<Link href="/c/men">
					<a className="group bg-black p-4">
						<article>
							<img
								src="https://tailwindcss.com/_next/static/media/retro-shoe.24e25785.jpg"
								alt="men"
								className="object-cover grayscale group-hover:grayscale-0 transition-filter"
							/>
							<h4 className="text-4xl font-bold font-mono text-white py-2">
								Men
							</h4>
						</article>
					</a>
				</Link>
				<Link href="/c/kids">
					<a className="group bg-black p-4 sm:col-span-2 sm:place-self-center lg:col-span-1">
						<article>
							<img
								src="https://tailwindcss.com/_next/static/media/retro-shoe.24e25785.jpg"
								alt="kids"
								// TODO: fix max height
								className="sm:max-h-96 md:max-h-fit object-cover grayscale group-hover:grayscale-0 transition-filter"
							/>
							<h4 className="text-4xl font-bold font-mono text-white py-2">
								Kids
							</h4>
						</article>
					</a>
				</Link>
			</Grid>
		</section>
	);
};
