import { router } from "../trpc";
import { brandRouter } from "./brand";
import { categoryRouter } from "./category";
import { dashboardRouter } from "./dashboard";
import { filtersRouter } from "./filters";
import { productRouter } from "./product";
import { reviewRouter } from "./review";
import { wishlistRouter } from "./wishlist";

export const appRouter = router({
	brand: brandRouter,
	category: categoryRouter,
	dashboard: dashboardRouter,
	filters: filtersRouter,
	product: productRouter,
	review: reviewRouter,
	wishlist: wishlistRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
