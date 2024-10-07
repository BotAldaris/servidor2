import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import Combobox, { type escolhas } from "../ComboBox";
import { Button } from "../ui/button";
import { type PostEspessuraRequest, ZEspessura } from "@/types/espessuras";
import { useState } from "react";

interface IProps {
	onSubmit: (values: z.infer<typeof ZEspessura>) => void;
	liga: PostEspessuraRequest;
	materiais: escolhas[]
	ligas: Map<string,escolhas[]>
}

export function EspessuraForm(props: IProps) {
	if (props.materiais.length === 0 || props.ligas.size === 0){
		return <h1>Adicione uma liga e um material antes de comecar</h1>
	}

	const [material,setMaterial] = useState(props.materiais[0].value)
	const form = useForm<z.infer<typeof ZEspessura>>({
		resolver: zodResolver(ZEspessura),
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
					name="numero"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Espessura</FormLabel>
							<FormControl>
								<Input placeholder="5,5" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
                <FormField
					control={form.control}
					name="preco"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Preço</FormLabel>
							<FormControl>
								<Input type="number" placeholder="9" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Combobox
                                escolhas={props.materiais}
                                menssageInput="Escolha o Material..."
                                menssageSearch="Procure por Material..."
                                messageEmpty="Nenhum Material encontrado."
                                menssageLabel="Material"
                                value={material}
                                setValue={(x) => setMaterial(x)}
                            />
                <FormField
					control={form.control}
					name="ligaId"
					render={({ field }) => (
						<FormItem>
							<FormControl>
                            <Combobox
                                escolhas={props.ligas.get(material) ?? []}
                                menssageInput="Escolha a Liga..."
                                menssageSearch="Procure por Liga..."
                                messageEmpty="Nenhum Liga encontrado."
                                menssageLabel="Liga"
                                value={field.value}
                                setValue={(x) => form.setValue("ligaId",x)}
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
