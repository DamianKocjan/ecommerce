import dynamic from "next/dynamic";
import React from "react";

import MediaQuery from "../../../../../shared/hooks/useMediaQuery";

const DesktopSearch = dynamic(
	() => import("./Desktop").then((mod) => mod.DesktopSearch),
	{
		ssr: false,
	},
) as React.FC;

const MobileSearch = dynamic(
	() => import("./Mobile").then((mod) => mod.MobileSearch),
	{
		ssr: false,
	},
) as React.FC;

export const Search: React.FC = () => {
	return (
		<>
			<MediaQuery max="md">
				<MobileSearch />
			</MediaQuery>
			<MediaQuery min="lg">
				<DesktopSearch />
			</MediaQuery>
		</>
	);
};
