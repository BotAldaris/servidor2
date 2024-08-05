import { createFileRoute } from "@tanstack/react-router";
import OpTable from "@/components/ops/OpTable";
import { getOps } from "@/services/ops";
import {
	type QueryClient,
	queryOptions,
	useSuspenseQuery,
} from "@tanstack/react-query";

const opsListQuery = () =>
	queryOptions({ queryKey: ["ops"], queryFn: () => getOps() });

function OPIndex() {
	const { data } = useSuspenseQuery(opsListQuery());
	return (
		<div>
			<OpTable ops={data} />
		</div>
	);
}

export const Route = createFileRoute("/ops/")({
	loader: ({ context: { queryClient } }) => {
		queryClient.ensureQueryData(opsListQuery());
	},
	component: () => <OPIndex />,
});
