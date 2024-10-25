import type { escolhas } from "@/components/ComboBox";
import DataTableBase from "@/components/DataTableBase";
import { DataTableColumnHeader } from "@/components/DataTableColumnHeader";
import { EspessuraTableToolbar } from "@/components/materiais/EspessuraToolBar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getEspessuras } from "@/services/espessurasService";
import { getLigaSeletor } from "@/services/ligasService";
import { getMaterialSeletor } from "@/services/materiais";
import type { Espessura } from "@/types/espessuras";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit2Icon, DeleteIcon } from "lucide-react";

async function pegarDados(): Promise<{
  dados: Espessura[];
  materiais: escolhas[];
  ligas: Map<string, escolhas[]>;
}> {
  let [dados, materiais, liga] = await Promise.all([
    getEspessuras(),
    getMaterialSeletor(),
    getLigaSeletor(),
  ]);
  materiais = translate(materiais);
  const novaLiga = new Map<string, escolhas[]>();
  for (const element of liga) {
    novaLiga.set(element[0], translate(element[1]));
  }
  return { dados, materiais, ligas: novaLiga };
}

const ligaListQuery = () =>
  queryOptions({
    queryKey: ["ligas", "materiaisSeletor"],
    queryFn: () => pegarDados(),
  });

export const Route = createFileRoute("/materiais/ligas/espessuras/")({
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
      await deletarEspessuraApi(id);
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
  const LigaColumn: ColumnDef<Espessura>[] = [
    {
      accessorKey: "numero",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Espessura" />
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
      accessorKey: "liga",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Liga" />
      ),
    },
    {
      accessorKey: "preco",
      header: () => <p>Preco</p>,
    },
    {
      id: "editar",
      cell: ({ row }) => {
        return (
          <Button
            onClick={() =>
              navigate({
                to: `/materiais/ligas/espessuras/editar/${row.original.id}`,
              })
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
        Toolbar={(x) => (
          <EspessuraTableToolbar
            table={x.table}
            seletor={translate(data.materiais)}
            ligas={data.ligas}
          />
        )}
      />
    </div>
  );
}

function translate(x: escolhas[]) {
  const i = [];
  for (let index = 0; index < x.length; index++) {
    const element = x[index];
    i.push({ label: element.label, value: element.label, valorReal: null });
  }
  return i;
}
function deletarEspessuraApi(id: string) {
  throw new Error("Function not implemented.");
}
