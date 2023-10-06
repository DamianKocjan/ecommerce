import { router } from "../trpc";
import { brandRouter } from "./brand";
import { categoryRouter } from "./category";
import { collectionRouter } from "./collection";
import { colorRouter } from "./color";
import { cutRouter } from "./cut";
import { dashboardRouter } from "./dashboard";
import { materialRouter } from "./material";
import { patternRouter } from "./pattern";
import { productRouter } from "./product";
import { reviewRouter } from "./review";
import { sizeRouter } from "./size";
import { wishlistRouter } from "./wishlist";

export const appRouter = router({
	brand: brandRouter,
	category: categoryRouter,
	collection: collectionRouter,
	color: colorRouter,
	cut: cutRouter,
	dashboard: dashboardRouter,
	material: materialRouter,
	pattern: patternRouter,
	product: productRouter,
	review: reviewRouter,
	size: sizeRouter,
	wishlist: wishlistRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
