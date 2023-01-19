import { NextSeo } from "next-seo";
import React from "react";

export interface ContainerProps {
	children: React.ReactNode;
	title?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, title }) => {
	return (
		<>
			{title && <NextSeo title={title} />}
			<div className="mx-auto max-w-7xl">{children}</div>
		</>
	);
};
