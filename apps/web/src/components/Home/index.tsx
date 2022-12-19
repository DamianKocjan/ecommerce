import { Container } from "../shared/Container";
import { ForWho } from "./ForWho";
import { Hero } from "./Hero";
import { NewProducts } from "./NewProducts";
import { SwiperBanner } from "./SwiperBanner";

export function Home() {
	return (
		<Container title="Home">
			<SwiperBanner />
			<Hero />
			<NewProducts />
			<ForWho />
		</Container>
	);
}
