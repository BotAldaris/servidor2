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
import { useToast } from "@/components/ui/use-toast";
import { orcar } from "@/services/orcamento";
import { OrcamentoForm, type PlanoOrcamentoTable } from "@/types/orcamento";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

export const Route = createFileRoute("/orcamento/")({
  component: () => <Orcamento />,
});

function Orcamento() {
  const [planos, setPlanos] = useState<PlanoOrcamentoTable[]>();
  const [index, setIndex] = useState<number>(0);
  function addPlano(planoNovo: PlanoOrcamentoTable) {
	const itens = []
    if (planos === undefined) {
      setPlanos([planoNovo]);
    } else {
      setPlanos([...planos, planoNovo]);
    }
  }
  const plano = planos === undefined ? undefined : planos[index];
  return (
    <div className="flex  flex-col justify-center items-center w-full gap-2">
      <MapaForm setPlano={addPlano} />
      {plano && (
        <OrcamentoTable
          itens={plano.planoOrcamento.itens}
          espessura={plano.planoOrcamento.espessura}
          volume={
            (plano.planoOrcamento.espessura *
              plano.planoOrcamento.comprimento *
              plano.planoOrcamento.largura) /
            1000000
          }
        />
      )}
    </div>
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
