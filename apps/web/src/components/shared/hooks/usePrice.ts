import { useMemo } from "react";
import { useCurrencyFormatter } from "./useCurrencyFormatter";

// TODO: remove formatting?
export function usePrice({
	price,
	discount,
}: {
	price: number;
	discount: number | null;
}) {
	const currencyFormatter = useCurrencyFormatter();
	const formattedPrice = useMemo(
		() => currencyFormatter.format(price ?? 0),
		[currencyFormatter, price],
	);
	const formattedDiscount = useMemo(
		() =>
			discount
				? currencyFormatter.format(price - (price * discount) / 100)
				: null,
		[currencyFormatter, discount, price],
	);
	const percent = useMemo(
		() =>
			(discount ? (discount * 100) / price : 0)
				.toPrecision(2)
				.split(".0")?.[0] ?? "",
		[discount, price],
	);

	return {
		formattedPrice,
		formattedDiscount,
		percent,
	};
}
