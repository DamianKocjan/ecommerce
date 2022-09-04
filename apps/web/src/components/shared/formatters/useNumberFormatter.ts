import { useMemo } from "react";

export function useNumberFormatter(locale: string = "en-us") {
	const formatter = useMemo(() => new Intl.NumberFormat(locale), [locale]);

	return formatter;
}
