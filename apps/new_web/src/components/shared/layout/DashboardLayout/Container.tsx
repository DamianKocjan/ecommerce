import { NextSeo } from "next-seo";
import React from "react";

export interface ContainerProps {
	children: React.ReactNode;
	title?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, title }) => {
	return (
		<div className="py-6">
			{title && (
				<>
					<NextSeo title={title} />
					<div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
						<h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
					</div>
				</>
			)}
			<div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
				<div className="py-4">{children}</div>
			</div>
		</div>
	);
};
