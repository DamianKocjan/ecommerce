import { trpc } from "@/utils/trpc";

export default function Hello() {
	const hello = trpc.useQuery(["hello", { text: "client" }]);
	if (!hello.data) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<p>{hello.data.greeting}</p>
		</div>
	);
}
