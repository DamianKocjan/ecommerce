"use client";

import { Star } from "@phosphor-icons/react";
import React from "react";

export function Rating({ rating }: { rating: number }) {
	const stars = React.useMemo(
		() =>
			Array.from({ length: 5 }, (_, i) => (
				<Star
					key={i}
					className={`h-5 w-5 ${i < rating ? "fill-primary" : "fill-muted stroke-muted-foreground"}`}
				/>
			)),
		[rating],
	);

	return <div className="flex items-center gap-0.5">{stars}</div>;
}
