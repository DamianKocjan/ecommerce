import { Metadata, Viewport } from "next";

import "~/styles/globals.css";

import { Providers } from "~/app/providers";
import { Toaster } from "~/components/ui/sonner";
import { fontMono, fontSans } from "~/lib/fonts";
import { cn } from "~/lib/utils";

export const metadata: Metadata = {
	title: {
		default: "Home - Ecommerce",
		template: `%s - Ecommerce`,
	},
	description: "Ecommerce website",
	icons: {
		icon: "/favicon.ico",
	},
	viewport: "width=device-width, initial-scale=1",
	robots: "follow, index",
	openGraph: {
		type: "website",
		locale: "en_IE",
		url: process.env.NEXT_PUBLIC_VERCEL_URL ?? "http://localhost:3000",
		siteName: "Ecommerce",
		title: "Ecommerce",
		description: "Ecommerce website",
		images: [
			// TODO: Add images
			{
				url: `${
					process.env.NEXT_PUBLIC_VERCEL_URL ?? "http://localhost:3000"
				}/logo.png`,
				width: 800,
				height: 600,
				alt: "Ecommerce",
			},
		],
	},
	twitter: {
		card: "summary",
		creator: "@vercel",
		site: "@vercel",
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={cn(
					"bg-background min-h-screen font-sans antialiased",
					fontSans.variable,
					fontMono.variable,
				)}
			>
				<Providers>
					<div className="relative flex min-h-screen flex-col">
						{children}
						<Toaster />
					</div>
				</Providers>
			</body>
		</html>
	);
}
