import React from "react";
import { DESKTOP_CATEGORIES, MOBILE_CATEGORIES } from "./constants";
import { DesktopCategories } from "./Desktop";
import { MobileCategories } from "./Mobile";

export const Categories: React.FC = () => {
	return (
		<>
			<DesktopCategories categories={DESKTOP_CATEGORIES} />
			<MobileCategories categories={MOBILE_CATEGORIES} />
		</>
	);
};
