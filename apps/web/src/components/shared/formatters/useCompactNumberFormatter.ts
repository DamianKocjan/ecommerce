import { useMemo } from "react";

export function useCompactNumberFormatter(locale: string = "en-us") {
	const formatter = useMemo(
		() => new Intl.NumberFormat(locale, { notation: "compact" }),
		[locale]
	);

	return formatter;
}
