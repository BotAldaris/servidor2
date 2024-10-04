import  {type  PostLigaRequest, ZLiga } from "@/types/ligas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import Combobox, { type escolhas } from "../ComboBox";
import { Button } from "../ui/button";

interface IProps {
	onSubmit: (values: z.infer<typeof ZLiga>) => void;
	liga: PostLigaRequest;
	materiais: escolhas[]
}

export function LigaForm(props: IProps) {
	const form = useForm<z.infer<typeof ZLiga>>({
		resolver: zodResolver(ZLiga),
		defaultValues: { ...props.liga },
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
							<FormLabel>Nome da Liga</FormLabel>
							<FormControl>
								<Input placeholder="Carbono" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
                <FormField
					control={form.control}
					name="densidade"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Densidade</FormLabel>
							<FormControl>
								<Input type="number" placeholder="9" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
                <FormField
					control={form.control}
					name="materialId"
					render={({ field }) => (
						<FormItem>
							<FormControl>
                            <Combobox
                                escolhas={props.materiais}
                                menssageInput="Escolha o Material..."
                                menssageSearch="Procure por Material..."
                                messageEmpty="Nenhum Material encontrado."
                                menssageLabel="Material"
                                value={field.value}
                                setValue={(x) => form.setValue("materialId",x)}
                            />
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
