import { GetServerSidePropsContext } from "next";

import { Catalog } from "../components/Catalog";

export default Catalog;

export function getServerSideProps(context: GetServerSidePropsContext) {
	const baseUrl = context.req.headers.host as string;
	const reqReferer = context.req.headers.referer;
	const previousUrl = reqReferer ? reqReferer.split(baseUrl)[1] : null;

	return {
		props: {
			previousUrl,
		},
	};
}
