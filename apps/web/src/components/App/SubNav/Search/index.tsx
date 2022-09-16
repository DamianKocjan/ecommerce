import MediaQuery from "@/components/shared/hooks/useMediaQuery";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const DesktopSearch = dynamic(
	() => import("./Desktop").then((mod) => mod.DesktopSearch),
	{
		ssr: false,
	}
) as React.FC;

const MobileSearch = dynamic(
	() => import("./Mobile").then((mod) => mod.MobileSearch),
	{
		ssr: false,
	}
) as React.FC;

export const Search: React.FC = () => {
	return (
		<Suspense>
			<MediaQuery max="md">
				<MobileSearch />
			</MediaQuery>
			<MediaQuery min="lg">
				<DesktopSearch />
			</MediaQuery>
		</Suspense>
	);
};
