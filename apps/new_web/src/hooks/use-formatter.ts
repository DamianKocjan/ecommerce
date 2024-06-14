import React from "react";

export function useCompactNumberFormatter(locale = "en-us") {
	const formatter = React.useMemo(
		() => new Intl.NumberFormat(locale, { notation: "compact" }),
		[locale],
	);

	return formatter;
}

export function useCurrencyFormatter(currency = "USD", locale = "en-us") {
	const formatter = React.useMemo(
		() =>
			new Intl.NumberFormat(locale, {
				currency,
				style: "currency",
			}),
		[currency, locale],
	);

	return formatter;
}

const DIVISIONS = [
	{ amount: 60, name: "seconds" },
	{ amount: 60, name: "minutes" },
	{ amount: 24, name: "hours" },
	{ amount: 7, name: "days" },
	{ amount: 4.34524, name: "weeks" },
	{ amount: 12, name: "months" },
	{ amount: Number.POSITIVE_INFINITY, name: "years" },
];

export function useFormatRelativeDate(locale = "en-us") {
	const formatter = React.useMemo(
		() =>
			new Intl.RelativeTimeFormat(locale, {
				numeric: "auto",
			}),
		[locale],
	);

	const formatRelativeDate = React.useCallback(
		(toDate: Date, fromDate = new Date()) => {
			let duration =
				((toDate as unknown as number) - (fromDate as unknown as number)) /
				1000;

			for (let i = 0; i <= DIVISIONS.length; i++) {
				const division = DIVISIONS[i];

				if (!division) {
					continue;
				}

				if (Math.abs(duration) < division.amount) {
					return formatter.format(
						Math.round(duration),
						division.name as Intl.RelativeTimeFormatUnit,
					);
				}
				duration /= division.amount;
			}
			return "";
		},
		[formatter],
	);

	return formatRelativeDate;
}

export function useNumberFormatter(locale = "en-us") {
	const formatter = React.useMemo(
		() => new Intl.NumberFormat(locale),
		[locale],
	);

	return formatter;
}
