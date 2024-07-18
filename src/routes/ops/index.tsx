import OpTable from "@/components/ops/OpTable";
import { getOps } from "@/services/ops";
import {
	type QueryClient,
	queryOptions,
	useSuspenseQuery,
} from "@tanstack/react-query";

const opsListQuery = () =>
	queryOptions({ queryKey: ["ops"], queryFn: () => getOps() });

export const loader = (queryClient: QueryClient) => async () => {
	await queryClient.ensureQueryData(opsListQuery());
};

function OPIndex() {
	const { data } = useSuspenseQuery(opsListQuery());
	return (
		<div>
			<OpTable ops={data} />
		</div>
	);
}

export default OPIndex;
