import { getServerSession } from "@ecommerce/auth";
import { Role } from "@ecommerce/db";
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

	if (session.user.role !== Role.ADMIN) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
};
