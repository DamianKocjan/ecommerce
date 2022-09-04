import { NextSeo } from "next-seo";

export interface ContainerProps {
	children: React.ReactNode;
	title?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, title }) => {
	return (
		<>
			{title && <NextSeo title={title} />}
			<div className="max-w-7xl mx-auto">{children}</div>
		</>
	);
};
