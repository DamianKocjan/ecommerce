import { prisma } from "@ecommerce/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type NextAuthOptions } from "next-auth";
import { type AppProviders } from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

let useMockProvider = process.env.NODE_ENV === "test";
const {
	GOOGLE_CLIENT_ID = "",
	GOOGLE_CLIENT_SECRET = "",
	NODE_ENV,
	APP_ENV,
} = process.env;

if (
	(NODE_ENV !== "production" || APP_ENV === "test") &&
	(!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET)
) {
	console.log("⚠️ Using mocked Google auth correct credentials were not added");
	useMockProvider = true;
}

const providers: AppProviders = [];

if (useMockProvider) {
	providers.push(
		CredentialsProvider({
			id: "google",
			name: "Mocked Google",
			async authorize(credentials) {
				const user = {
					id: credentials?.name,
					name: credentials?.name,
					email: credentials?.name,
				};
				return user;
			},
			credentials: {
				name: { type: "test" },
			},
		})
	);
} else {
	providers.push(
		GoogleProvider({
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
		})
	);
}

export const nextAuthOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers,
	callbacks: {
		async session({ session, user }) {
			if (!user.email) {
				throw new Error("No user found.");
			}

			const dbUser = await prisma.user.findUnique({
				where: { email: user.email },
			});

			session.user = dbUser;

			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
};

export * from "next-auth";
