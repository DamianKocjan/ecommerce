import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { AppType } from "next/app";

import { Nav } from "../components/App/Nav";
import { NProgress } from "../components/App/NProgress";
import { SubNav } from "../components/App/SubNav";
import "../styles/globals.css";
import { trpc } from "../utils/trpc";

const App: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<ThemeProvider
			storageKey="preferred-theme"
			attribute="class"
			forcedTheme="light"
		>
			<SessionProvider session={session}>
				<DefaultSeo
					additionalMetaTags={[
						{
							name: "viewport",
							content: "width=device-width, initial-scale=1",
						},
					]}
					defaultTitle="Ecommerce"
					titleTemplate="%s | Ecommerce"
					description="Ecommerce website"
					canonical={
						process.env.NEXT_PUBLIC_VERCEL_URL ?? "http://localhost:3000"
					}
					openGraph={{
						type: "website",
						locale: "en_IE",
						url: process.env.NEXT_PUBLIC_VERCEL_URL ?? "http://localhost:3000",
						site_name: "Ecommerce",
						title: "Ecommerce",
						description: "Ecommerce website",
						images: [
							// TODO: Add images
							{
								url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/logo.png`,
								width: 800,
								height: 600,
								alt: "Ecommerce",
							},
						],
					}}
					twitter={{
						cardType: "summary",
						handle: "@vercel",
						site: "@vercel",
					}}
				/>

				<NProgress />
				<Nav />
				<SubNav />

				<main>
					<Component {...pageProps} />
				</main>
			</SessionProvider>
		</ThemeProvider>
	);
};

export default trpc.withTRPC(App);
