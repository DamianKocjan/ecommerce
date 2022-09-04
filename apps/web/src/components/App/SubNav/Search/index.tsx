import MediaQuery from "@/components/shared/hooks/useMediaQuery";
import React from "react";
import DesktopSearch from "./Desktop";
import MobileSearch from "./Mobile";

export const Search: React.FC = () => {
	return (
		<>
			{/* <div className="lg:hidden">
				<MobileSearch />
			</div>
			<div className="hidden lg:block">
				<DesktopSearch />
			</div> */}
			<MediaQuery max="md">
				<MobileSearch />
			</MediaQuery>
			<MediaQuery min="lg">
				<DesktopSearch />
			</MediaQuery>
		</>
	);
};
