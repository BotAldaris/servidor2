import { createFileRoute } from "@tanstack/react-router";
import { DataTableColumnHeader } from "@/components/DataTableColumnHeader";
import ResumoOpTable from "@/components/ops/ResumoOpTable";
import { getResumoOps } from "@/services/ops";
import type { OpResumo } from "@/types/op";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
const resumoOpListQuery = () =>
	queryOptions({ queryKey: ["resumo", "OP"], queryFn: () => getResumoOps() });

function ResumoOpIndex() {
	const { data } = useSuspenseQuery(resumoOpListQuery());
	const columns: ColumnDef<OpResumo>[] = [
		{
			accessorKey: "numero",
			header: ({ column }) => {
				return <DataTableColumnHeader column={column} title="Numero" />;
			},
		},
		{
			accessorKey: "cliente",
			header: ({ column }) => {
				return <DataTableColumnHeader column={column} title="Cliente" />;
			},
		},
		{
			accessorKey: "dataEntrega",
			header: ({ column }) => {
				return (
					<DataTableColumnHeader column={column} title="Data de Entrega" />
				);
			},
			cell: ({ cell }) => {
				return <p>{format(cell.getValue() as Date, "PP", { locale: ptBR })}</p>;
			},
		},
		{
			accessorKey: "status",
			header: "Status",
		},
	];

	return (
		<div>
			<ResumoOpTable columns={columns} data={data} filter="numero" />
		</div>
	);
}

export const Route = createFileRoute("/ops/resumo")({
	loader: ({ context: { queryClient } }) => {
		queryClient.ensureQueryData(resumoOpListQuery());
	},
	component: () => <ResumoOpIndex />,
});
