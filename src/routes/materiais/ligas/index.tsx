import DataTableBase from "@/components/DataTableBase";
import { DataTableColumnHeader } from "@/components/DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteLigaApi, getLigas } from "@/services/ligasService";
import type Liga from "@/types/ligas";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit2Icon, DeleteIcon } from "lucide-react";
const ligaListQuery = () =>
	queryOptions({ queryKey: ["ligas"], queryFn: () => getLigas() });

export const Route = createFileRoute("/materiais/ligas/")({
	loader: ({ context: { queryClient } }) => {
		queryClient.ensureQueryData(ligaListQuery());
	},
	component: () => <LigaIndex />,
});

function LigaIndex() {
	const { data, refetch } = useSuspenseQuery(ligaListQuery());
	const { toast } = useToast();
	async function deletar(id: string) {
		try {
			await deleteLigaApi(id);
			await refetch();
		} catch (e) {
			const b = e as Error;
			toast({
				variant: "destructive",
				title: "Erro ao deletar a liga",
				description: `Erro: ${b.message}`,
			});
		}
	}
	const navigate = useNavigate();
	const LigaColumn: ColumnDef<Liga>[] = [
		{
			accessorKey: "nome",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Nome" />
			),
		},
		{
			accessorKey: "material",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Nome" />
			),
			filterFn: (row, id, value) => {
				return value.includes(row.getValue(id));
			},
		},
		{
			accessorKey: "densidade",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Nome" />
			),
		},

		{
			accessorKey: "nome",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Nome" />
			),
		},
		{
			id: "editar",
			cell: ({ row }) => {
				return (
					<Button
						onClick={() =>
							navigate({ to: `/materiais/ligas/editar/${row.original.id}` })
						}
					>
						<Edit2Icon className="h-4 w-4" />
					</Button>
				);
			},
		},
		{
			id: "deletar",
			cell: ({ row }) => {
				return (
					<Button onClick={() => deletar(row.original.id)}>
						<DeleteIcon className="h-4 w-4" />
					</Button>
				);
			},
		},
	];
	return (
		<div>
			<DataTableBase
				columns={LigaColumn}
				data={data}
				filter="nome"
				nome="Nome"
			/>
		</div>
	);
}
