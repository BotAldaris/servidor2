import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { type PostEmpresaRequest, ZEmpresa } from "@/types/empresas";

interface IProps {
  onSubmit: (values: z.infer<typeof ZEmpresa>) => void;
  empresa: PostEmpresaRequest;
}

export function EmpresaForm(props: IProps) {
  const form = useForm<z.infer<typeof ZEmpresa>>({
    resolver: zodResolver(ZEmpresa),
    defaultValues: { ...props.empresa },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(props.onSubmit)}
        className="w-2/3 space-y-6 "
      >
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Empresa</FormLabel>
              <FormControl>
                <Input placeholder="Laser Prime" {...field} />
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
