import type { escolhas } from "@/components/ComboBox";
import OrcamentoTable from "@/components/orcamento/OrcamentoTable";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { getEspessuraSeletor } from "@/services/espessurasService";
import { getLigaSeletor } from "@/services/ligasService";
import { getMaterialSeletor } from "@/services/materiais";
import { orcar } from "@/services/orcamento";
import { OrcamentoForm, type PlanoOrcamentoTable } from "@/types/orcamento";
import { zodResolver } from "@hookform/resolvers/zod";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

async function pegarDados(): Promise<{
  espessuras: Map<string, escolhas[]>;
  materiais: escolhas[];
  ligas: Map<string, escolhas[]>;
}> {
  const [espessuras, materiais, ligas] = await Promise.all([
    getEspessuraSeletor(),
    getMaterialSeletor(),
    getLigaSeletor(),
  ]);
  const result = [];
  for (const material of materiais) {
    result.push({ label: material.label, value: material.label } as escolhas);
  }
  return { espessuras, materiais: result, ligas };
}
const adicionarOrcamentoQuery = queryOptions({
  queryKey: ["orcar", "adicionar"],
  queryFn: () => pegarDados(),
});

export const Route = createFileRoute("/orcamento/")({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(adicionarOrcamentoQuery);
  },
  component: () => <Orcamento />,
});

function Orcamento() {
  const { data } = useSuspenseQuery(adicionarOrcamentoQuery);
  const [planos, setPlanos] = useState<PlanoOrcamentoTable[]>([]);
  const [index, setIndex] = useState<number>(0);
  function addPlano(planoNovo: PlanoOrcamentoTable) {
    setPlanos((prevPlanos) => [...prevPlanos, planoNovo]);
  }
  const [plano, setPlano] = useState<PlanoOrcamentoTable | undefined>(
    undefined
  );
  function atualizarOrcamento(item: PlanoOrcamentoTable) {
    setPlanos((prevPlanos) => {
      const novoPlanos = [...prevPlanos]; // Cria uma cópia do array
      if (novoPlanos[index]) {
        novoPlanos[index] = item; // Atualiza o plano no índice atual
      }
      return novoPlanos; // Retorna o novo array atualizado
    });
  }
  useEffect(() => {
    if (planos.length > 0 && index < planos.length) {
      setPlano(planos[index]);
    } else {
      setPlano(undefined); // Limpa o plano se o índice for inválido
    }
  }, [index, planos]);
  return (
    <Tabs defaultValue="orcar">
      <TabsList>
        <TabsTrigger value="orcar">Orcar</TabsTrigger>
        <TabsTrigger value="finalizar">Finalizar</TabsTrigger>
      </TabsList>
      <TabsContent value="orcar">
        <div className="flex  flex-col justify-center items-center w-full gap-2">
          <MapaForm setPlano={addPlano} />
          {plano && (
            <div className="flex  flex-col justify-center items-center w-full">
              <OrcamentoTable
                itens={plano.planoOrcamento.itens}
                espessura={plano.planoOrcamento.espessura}
                volume={
                  (plano.planoOrcamento.espessura *
                    plano.planoOrcamento.comprimento *
                    plano.planoOrcamento.largura) /
                  1000000
                }
                plano={plano}
                setOrcamento={atualizarOrcamento}
                index={index}
                setIndex={setIndex}
                length={planos === undefined ? 0 : planos.length}
                espessuras={data.espessuras}
                materiais={data.materiais}
                ligas={data.ligas}
              />
            </div>
          )}
        </div>
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
}

interface IMapaFormProps {
  setPlano: (plano: PlanoOrcamentoTable) => void;
}
function MapaForm(props: IMapaFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof OrcamentoForm>>({
    resolver: zodResolver(OrcamentoForm),
  });
  const fileRef = form.register("file");
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof OrcamentoForm>) {
    try {
      const result = await orcar(values.file[0]);
      props.setPlano({
        planoOrcamento: result,
        preco: 0,
        porcentagem: 0,
      } as PlanoOrcamentoTable);
      console.log(result);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Erro ao salvar a op no Mapa",
        description: `Erro: ${e}`,
      });
      console.log(e);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 ">
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Escolha o arquivo</FormLabel>
              <FormControl>
                <Input {...fileRef} type="file" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  );
}
