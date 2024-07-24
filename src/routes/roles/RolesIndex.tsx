import { DataTable } from "@/components/roles/dataTable";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteRole, getRoles } from "@/services/roles";
import type Roles from "@/types/Roles";
import {
	type QueryClient,
	queryOptions,
	useSuspenseQuery,
} from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Trash2Icon } from "lucide-react";

const roleListQuery = () =>
	queryOptions({ queryKey: ["roles"], queryFn: () => getRoles() });

export const loader = (queryClient: QueryClient) => async () => {
	await queryClient.ensureQueryData(roleListQuery());
};

export default function RolesIndex() {
	const { data, refetch } = useSuspenseQuery(roleListQuery());
	const { toast } = useToast();
	async function deletar(id: string) {
		try {
			await deleteRole(id);
			await refetch();
		} catch (e) {
			const b = e as Error;
			toast({
				variant: "destructive",
				title: "Erro ao deletar a regra",
				description: `Erro: ${b.message}`,
			});
			console.log(e);
		}
	}
	const columns: ColumnDef<Roles>[] = [
		{
			accessorKey: "nome",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Nome
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
		},
		{
			id: "delete",
			header: "Deletar",
			cell: ({ row }) => {
				const role = row.original;

				return (
					<Button
						variant="outline"
						size="icon"
						onClick={() => deletar(role.id)}
					>
						<Trash2Icon className="h-4 w-4" />
					</Button>
				);
			},
		},
		{
			accessorKey: "amount",
			header: "Amount",
		},
	];

	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={data} />
		</div>
	);
}
