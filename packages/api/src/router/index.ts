import { router } from "../trpc";
import { analyticsRouter } from "./analytics";
import { brandRouter } from "./brand";
import { categoryRouter } from "./category";
import { collectionRouter } from "./collection";
import { colorRouter } from "./color";
import { cutRouter } from "./cut";
import { materialRouter } from "./material";
import { patternRouter } from "./pattern";
import { productRouter } from "./product";
import { sizeRouter } from "./size";
import { wishlistRouter } from "./wishlist";

export const appRouter = router({
	analytics: analyticsRouter,
	brand: brandRouter,
	category: categoryRouter,
	collection: collectionRouter,
	color: colorRouter,
	cut: cutRouter,
	material: materialRouter,
	pattern: patternRouter,
	product: productRouter,
	size: sizeRouter,
	wishlist: wishlistRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
