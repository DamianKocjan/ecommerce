import Script from "next/script";
import React from "react";

export const Analytics: React.FC = () => {
	if (process.env.NODE_ENV === "production") {
		return null;
	}
	return (
		<>
			<Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
			<noscript>
				{/* eslint-disable @next/next/no-img-element */}
				<img
					src="https://queue.simpleanalyticscdn.com/noscript.gif"
					alt=""
					referrerPolicy="no-referrer-when-downgrade"
				/>
			</noscript>
		</>
	);
};
