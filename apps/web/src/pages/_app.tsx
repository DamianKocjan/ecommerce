import { Nav } from "@/components/App/Nav";
import { NProgress } from "@/components/App/NProgress";
import { SubNav } from "@/components/App/SubNav";
import { Session } from "@ecommerce/auth";
import {
	SessionProvider,
	signIn,
	useSession,
} from "@ecommerce/auth/nextjs/client";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { withTRPC } from "@trpc/next";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import superjson from "superjson";
import { AppRouter } from "../server";
import "../styles/globals.css";

function AppCore({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps<{
	session: Session | null;
}>) {
	// Quick fix for type error
	const ReactComponent = Component as unknown as React.FC & {
		auth?: boolean;
	};

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
					{ReactComponent.auth ? (
						<Auth>
							<ReactComponent {...pageProps} />
						</Auth>
					) : (
						<ReactComponent {...pageProps} />
					)}
				</main>
			</SessionProvider>
		</ThemeProvider>
	);
}

function Auth({ children }: { children: JSX.Element }): JSX.Element {
	useSession({
		required: true,
		onUnauthenticated() {
			signIn("google");
		},
	});

	return children;
}

function getBaseUrl() {
	if (process.browser) return ""; // Browser should use current path
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

	return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
	config() {
		const url = `${getBaseUrl()}/api/trpc`;

		return {
			transformer: superjson,
			links: [
				loggerLink({
					enabled: (opts) =>
						process.env.NODE_ENV === "development" ||
						(opts.direction === "down" && opts.result instanceof Error),
				}),
				httpBatchLink({
					url,
				}),
			],
		};
	},
	ssr: true,
})(AppCore);
