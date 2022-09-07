import Image from "next/image";
import React from "react";

export const Empty: React.FC = () => {
	return (
		<div className="flex flex-col items-center justify-center mt-6 text-center">
			<Image src="/undraw_web_search_re_efla.svg" width="600" height="400" />
			<h3 className="text-4xl mt-6 mb-4 text-teal-400 font-bold">
				No products found
			</h3>
			<p className="text-xl text-neutral-800">
				Please try another search or browse the categories.
			</p>
		</div>
	);
};
