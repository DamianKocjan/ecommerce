import fetch from "node-fetch";

const API_URL = "https://simpleanalytics.com";
const API_KEY = process.env.SIMPLE_ANALYTICS_API_KEY!;
const USER_ID = process.env.SIMPLE_ANALYTICS_USER_ID!;

const HOSTNAME = (
	process.env.NEXT_PUBLIC_VERCEL_URL ?? "https://simpleanalytics.com"
).split("://")[1]!; // "http://localhost:3000";

function path(pathname: string, queryParams?: QueryParams) {
	const url = new URL(API_URL);
	url.pathname = pathname + ".json";

	if (queryParams) {
		Object.entries(queryParams).forEach(([key, value]) => {
			if (value !== undefined) {
				url.searchParams.set(key, value.toString());
			}
		});
	}
	return url.toString();
}

function headers(): Record<string, string> {
	enforceEnv();

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
		"https://simpleanalytics.com/simpleanalytics.com.json?version=4&fields=histogram,pageviews,referrers,device_types,browser_names",
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
