import { useMemo } from "react";

export function useCurrencyFormatter(
	currency: string = "USD",
	locale: string = "en-us"
) {
	const formatter = useMemo(
		() =>
			new Intl.NumberFormat(locale, {
				currency,
				style: "currency",
			}),
		[currency, locale]
	);

	return formatter;
}
