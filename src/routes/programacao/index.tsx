import { programacaoColumns } from "@/components/programacao/columns";
import { ProgramacaoDataTable } from "@/components/programacao/ProgramacaoDataTable";
import {
	getItensProgramar,
	getUniquesClientes,
	getUniquesEspessuras,
	getUniquesMateriais,
} from "@/services/itensOp";
import type { IItemProgramacao } from "@/types/itensOp";
import type { ITableFaceted } from "@/types/tableFaceted";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

async function pegarDados(): Promise<{
	dados: IItemProgramacao[];
	espessuras: ITableFaceted<number>[];
	materiais: ITableFaceted<string>[];
	clientes: ITableFaceted<string>[];
}> {
	const [dados, espessuras, materiais, clientes] = await Promise.all([
		getItensProgramar(),
		getUniquesEspessuras(),
		getUniquesMateriais(),
		getUniquesClientes(),
	]);
	return { dados, espessuras, materiais, clientes };
}

const programacaoListQuery = queryOptions({
	queryKey: ["programacao"],
	queryFn: () => pegarDados(),
});

export const Route = createFileRoute("/programacao/")({
	loader: ({ context: { queryClient } }) => {
		return queryClient.ensureQueryData(programacaoListQuery);
	},
	component: () => <ProgramacaoIndex />,
});

function ProgramacaoIndex() {
	const postsQuery = useSuspenseQuery(programacaoListQuery);
	const result = postsQuery.data;
	return (
		<ProgramacaoDataTable
			data={result.dados}
			columns={programacaoColumns}
			clientes={result.clientes}
			materiais={result.materiais}
			espessuras={result.espessuras}
		/>
	);
}