import DataTableBase from "@/components/DataTableBase";
import { DataTableColumnHeader } from "@/components/DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteEmpresaApi, getEmpresas } from "@/services/empresasService";
import type { Empresa } from "@/types/empresas";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { DeleteIcon, Edit2Icon } from "lucide-react";

const materialListQuery = () =>
  queryOptions({ queryKey: ["Empresas"], queryFn: () => getEmpresas() });

export const Route = createFileRoute("/empresas/")({
  component: () => <EmpresasIndex />,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(materialListQuery());
  },
});

function EmpresasIndex() {
  const { data, refetch } = useSuspenseQuery(materialListQuery());
  const navigate = useNavigate();
  const { toast } = useToast();
  async function deletar(id: string) {
    try {
      await deleteEmpresaApi(id);
      await refetch();
    } catch (e) {
      const b = e as Error;
      toast({
        variant: "destructive",
        title: "Erro ao deletar a empresa",
        description: `Erro: ${b.message}`,
      });
    }
  }
  const MaterialColumn: ColumnDef<Empresa>[] = [
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
              navigate({ to: `/empresas/editar/${row.original.id}` })
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
    <DataTableBase
      columns={MaterialColumn}
      data={data}
      filter="nome"
      nome="Nome"
    />
  );
}
