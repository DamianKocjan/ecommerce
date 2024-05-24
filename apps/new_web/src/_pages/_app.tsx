import type { NextPage } from "next";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import React from "react";

import { Analytics } from "~/components/App/Analytics";
import { NProgress } from "~/components/App/NProgress";
import { ShopLayout } from "~/components/shared/layout/ShopLayout";
import { trpc } from "~/utils/trpc";
import "../styles/globals.css";

export type NextPageWithLayout<P = unknown> = NextPage<P> & {
	getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps<{ session: Session | null }> & {
	Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout =
		Component.getLayout ?? ((page) => <ShopLayout>{page}</ShopLayout>);

	return (
		<ThemeProvider
			storageKey="preferred-theme"
			attribute="class"
			forcedTheme="light"
		>
			<SessionProvider session={pageProps.session}>
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
								url: `${
									process.env.NEXT_PUBLIC_VERCEL_URL ?? "http://localhost:3000"
								}/logo.png`,
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

				<Analytics />
				<NProgress />

				{getLayout(<Component {...pageProps} />)}
			</SessionProvider>
		</ThemeProvider>
	);
}

export default trpc.withTRPC(App);
