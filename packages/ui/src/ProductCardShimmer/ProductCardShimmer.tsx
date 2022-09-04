import React from "react";

export const ProductCardShimmer: React.FC = () => {
	return (
		<div className="animate-pulse flex flex-col space-y-2">
			<div className="relative h-64 bg-black/25 w-full before:absolute before:z-[-1] md:before:top-1 md:before:left-1 before:top-0.5 before:left-0.5 before:w-full before:h-full before:bg-teal-400/10" />
			<div className="h-4 bg-black/25 w-1/5" />
			<div className="h-8 bg-black/25 w-5/6" />
			<div className="flex items-center w-full">
				<div className="h-5 bg-black/25 w-1/3" />
				<div className="flex-1" />
				<div className="h-10 w-10 bg-black/25" />
				<div className="h-10 w-10 bg-black/25 ml-2" />
			</div>
		</div>
	);
};
