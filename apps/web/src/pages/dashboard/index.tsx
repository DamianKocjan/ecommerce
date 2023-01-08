import { getServerSession } from "@ecommerce/auth";
import { GetServerSideProps } from "next";
import { Dashboard } from "../../components/Dashboard";

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req, res } = context;
	const session = await getServerSession({ req, res });

	if (!session) {
		return {
			redirect: {
				destination: "/api/auth/signin",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};
