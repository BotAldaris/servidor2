import { EmpresaForm } from "@/components/empresas/empresasForm";
import { useToast } from "@/components/ui/use-toast";
import { saveEmpresaApi } from "@/services/empresasService";
import type { ZEmpresa } from "@/types/empresas";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { z } from "zod";

export const Route = createFileRoute("/empresas/adicionar")({
  component: () => AddEmpresa(),
});

function AddEmpresa() {
  const navigate = useNavigate();
  const { toast } = useToast();
  async function onSubmit(values: z.infer<typeof ZEmpresa>) {
    try {
      await saveEmpresaApi({ ...values });
      navigate({ to: "/empresas", replace: true });
    } catch (e) {
      const b = e as Error;
      toast({
        variant: "destructive",
        title: "Erro ao criar a empresa",
        description: `Erro: ${b.message}`,
      });
      console.log(e);
    }
  }
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <EmpresaForm onSubmit={onSubmit} empresa={{ nome: "" }} />
    </div>
  );
}
