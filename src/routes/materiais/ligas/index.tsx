import type { escolhas } from "@/components/ComboBox";
import DataTableBase from "@/components/DataTableBase";
import { DataTableColumnHeader } from "@/components/DataTableColumnHeader";
import { LigasTableToolbar } from "@/components/materiais/LigasTableToolBar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteLigaApi, getLigas } from "@/services/ligasService";
import { getMaterialSeletor } from "@/services/materiais";
import type Liga from "@/types/ligas";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit2Icon, DeleteIcon } from "lucide-react";

async function pegarDados(): Promise<{
	dados: Liga[];
	materiais: escolhas[];
}> {
	const [dados, materiais] = await Promise.all([
		getLigas(),
        getMaterialSeletor(),
	]);
	return { dados, materiais };
}

const ligaListQuery = () =>
	queryOptions({ queryKey: ["ligas","materiaisSeletor"], queryFn: () => pegarDados() });

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
				<DataTableColumnHeader column={column} title="Material" />
			),
			filterFn: (row, id, value) => {
				return value.includes(row.getValue(id));
			},
		},
		{
			accessorKey: "densidade",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Densidade" />
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
				data={data.dados}
				filter="nome"
				nome="Nome"
				Toolbar={(x) => <LigasTableToolbar table={x.table} seletor={translate(data.materiais)} />}
				/>
		</div>
	);
}

function translate(x: escolhas[]){
		const i = []
		for (let index = 0; index < x.length; index++) {
			const element = x[index];
			i.push({label:element.label,value:element.label})
		}
		return i
	}
