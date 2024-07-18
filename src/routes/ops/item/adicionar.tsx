import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ItemOp from "@/types/itensOp";
import { Checkbox } from "@/components/ui/checkbox";
import type { z } from "zod";
import { saveItemOpApi } from "@/services/itensOp";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
function ItemOpAdicionar() {
	const navigate = useNavigate();
	const { toast } = useToast();
	const form = useForm<z.infer<typeof ItemOp>>({
		resolver: zodResolver(ItemOp),
		defaultValues: {
			op: "",
			codigo: "",
			programado: false,
		},
	});

	async function onSubmit(values: z.infer<typeof ItemOp>) {
		try {
			await saveItemOpApi({ ...values });
			navigate("/ops", { replace: true });
		} catch (e) {
			toast({ title: "Erro ao salvar a op", description: `Erro: ${e}` });
			console.log(e);
		}
		console.log(values);
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 ">
				<FormField
					control={form.control}
					name="op"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Numero da OP</FormLabel>
							<FormControl>
								<Input placeholder="0999-99" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="codigo"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Codigo</FormLabel>
							<FormControl>
								<Input placeholder="SE04.0373.23" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="quantidade"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Quantidade</FormLabel>
							<FormControl>
								<Input type="number" placeholder="1" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="material"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Material</FormLabel>
							<FormControl>
								<Input placeholder="SAE 1020" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="espessura"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Espessura</FormLabel>
							<FormControl>
								<Input type="number" placeholder="SE04.0373.23" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="valorLaser"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Valor Lazer unitário</FormLabel>
							<FormControl>
								<Input placeholder="4" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="valorDobra"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Valor Dobra</FormLabel>
							<FormControl>
								<Input placeholder="10" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="valorCalderaria"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Valor Calderaria</FormLabel>
							<FormControl>
								<Input placeholder="1" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="valorUsinagem"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Valor Usinagem</FormLabel>
							<FormControl>
								<Input placeholder="33" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="valorEntrega"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Valor Entrega</FormLabel>
							<FormControl>
								<Input placeholder="7" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="valorMateriaPrima"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Valor Matéria Prima</FormLabel>
							<FormControl>
								<Input placeholder="5" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="programado"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel>Programado</FormLabel>
							</div>
						</FormItem>
					)}
				/>
				<Button type="submit">Enviar</Button>
			</form>
		</Form>
	);
}
export default function AdicionarItemOP() {
	return (
		<div className="flex  flex-col justify-center items-center w-full">
			<ItemOpAdicionar />
		</div>
	);
}
