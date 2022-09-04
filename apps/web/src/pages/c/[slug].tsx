import { Category } from "@/components/Category";
import { GetServerSidePropsContext } from "next";

export default Category;

export function getServerSideProps(context: GetServerSidePropsContext) {
	const baseUrl = context.req.headers.host as string;
	const reqReferer = context.req.headers.referer;
	const previousUrl = reqReferer ? reqReferer.split(baseUrl)[1] : null;

	return {
		props: {
			previousUrl: previousUrl || null,
		},
	};
}
