import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Cart",
};

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return children;
}
