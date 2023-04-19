import fetch from "node-fetch";

const API_URL = "https://simpleanalytics.com";
const API_KEY = process.env.SIMPLE_ANALYTICS_API_KEY;
const USER_ID = process.env.SIMPLE_ANALYTICS_USER_ID;

const HOSTNAME = (
	process.env.NEXT_PUBLIC_VERCEL_URL ?? "https://simpleanalytics.com"
).split("://")[1] as string; // "http://localhost:3000";

function assert(env: string | undefined): asserts env is string {
	if (!env) {
		throw new Error("Missing API_KEY");
	}
}

function headers(): Record<string, string> {
	assert(API_KEY);
	assert(USER_ID);

	return {
		"Content-Type": "application/json",
		"Api-Key": API_KEY,
		"User-Id": USER_ID,
	};
}

interface HistogramPoint {
	date: string;
	pageviews: number;
	visitors: number;
}

interface Referrer {
	value: string;
	visits: number;
	uniqueVisits: number;
}

interface Browser {
	value: string;
	visits: number;
	uniqueVisits: number;
}

interface Device {
	value: string;
	visits: number;
	uniqueVisits: number;
}

interface Analytics {
	pageviews: number;
	histogram: HistogramPoint[];
	referrers: Referrer[];
	browser_names: Browser[];
	device_types: Device[];
}

export async function fetchAnalytics() {
	const res = await fetch(
		`${API_URL}/${HOSTNAME}.json?version=4&fields=histogram,pageviews,referrers,device_types,browser_names`,
		{
			headers: headers(),
		},
	);

	const { pageviews, histogram, referrers, browser_names, device_types } =
		(await res.json()) as Analytics;

	return {
		pageviews,
		histogram,
		referrers,
		browser_names,
		device_types,
	};
}

type ProductAnalytics = Omit<Analytics, "browser_names" | "device_types">;

export async function fetchProductAnalytics(slug: string) {
	const res = await fetch(
		`${API_URL}/${HOSTNAME}/products/${slug}.json?version=4&fields=histogram,pageviews,referrers`,
		{
			headers: headers(),
		},
	);

	const { pageviews, histogram, referrers } =
		(await res.json()) as ProductAnalytics;

	return {
		pageviews,
		histogram,
		referrers,
	};
}
