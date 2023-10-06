import { Container } from "~/components/shared/layout/ShopLayout/Container";
import { NextPageWithLayout } from "~/pages/_app";
import { ForWho } from "./ForWho";
import { Hero } from "./Hero";
import { NewProducts } from "./NewProducts";
import { SwiperBanner } from "./SwiperBanner";

export const Home: NextPageWithLayout = () => {
	return (
		<Container title="Home">
			<SwiperBanner />
			<Hero />
			<NewProducts />
			<ForWho />
		</Container>
	);
};
