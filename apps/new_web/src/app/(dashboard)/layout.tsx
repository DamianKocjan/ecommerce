interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<>
			<div className="flex-1">{children}</div>
		</>
	);
}
