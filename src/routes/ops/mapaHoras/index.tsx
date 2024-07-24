import Loading from "@/components/Loading";
import MapaGanttChart from "@/components/mapaHoras/MapaGanttChart";
import MapaTable from "@/components/mapaHoras/MapaTabela";
import MapaTopBar from "@/components/mapaHoras/MapaTopBar";
import { Button } from "@/components/ui/button";
import { getMapaHorasByData } from "@/services/MapaHoras";
import type IMapaHora from "@/types/mapaHoras";
import {
	type QueryObserverResult,
	queryOptions,
	type RefetchOptions,
	useQuery,
	type QueryClient,
} from "@tanstack/react-query";
import { useState } from "react";

const mapaHorasListQuery = (data: Date) =>
	queryOptions({
		queryKey: ["mapaHoras", data.toISOString().split("T")[0]],
		queryFn: () => getMapaHorasByData(data),
	});

export const loader = (queryClient: QueryClient) => async () => {
	const data = new Date();
	data.setHours(0, 0, 0, 0);
	return await queryClient.ensureQueryData(mapaHorasListQuery(data));
};

export default function MapaHorasIndex() {
	const dataI = new Date();
	dataI.setHours(0, 0, 0, 0);
	const [date, setDate] = useState<Date | undefined>(dataI);
	const { data, isLoading, isError, refetch } = useQuery(
		mapaHorasListQuery(date == null ? dataI : date),
	);
	return (
		<div>
			{isLoading ? (
				<Loading />
			) : isError ? (
				<ErrorText refetch={refetch} />
			) : (
				<div>
					<MapaTopBar date={date} setDate={setDate} dados={data} />
					<MapaTable mapa={data === undefined ? ([] as IMapaHora[]) : data} />
					<MapaGanttChart
						mapaHoras={data === undefined ? ([] as IMapaHora[]) : data}
					/>{" "}
				</div>
			)}
		</div>
	);
}

interface IErrorProps {
	refetch: (
		options?: RefetchOptions,
	) => Promise<QueryObserverResult<IMapaHora[], Error>>;
}

function ErrorText(props: IErrorProps) {
	return (
		<div>
			<p>Ocorreu um erro ao pegar os itens da op, tente novamente.</p>
			<Button onClick={() => props.refetch()}>Tentar Novamente</Button>
		</div>
	);
}
