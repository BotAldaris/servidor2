import { getItensOpsByOpId } from "@/services/ops";
import { queryOptions, useQuery } from "@tanstack/react-query";
import Loading from "../../Loading";
import { Input } from "@/components/ui/input";
import type { IItemOp } from "@/types/itensOp";
import ErrorText from "@/components/errorText";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { faturarOp } from "@/services/estatisticas";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "@tanstack/react-router";
interface IProps {
	id: string;
}

const formSchema = z.object({
	itens: z.array(
		z.object({
			id: z.string().readonly(),
			codigo: z.string().readonly(),
			quantidade: z.number().readonly(),
			quantidadeFabricada: z.coerce.number(),
		}),
	),
});
const itensOpQuery = (id: string) =>
	queryOptions({
		queryKey: ["FaturaritensOp", id],
		queryFn: () => getItensOpsByOpId(id),
	});

export default function FaturaTableContent(props: IProps) {
	const { data, isLoading, isError, refetch } = useQuery(
		itensOpQuery(props.id),
	);
	if (isLoading) {
		return <Loading />;
	}
	if (isError) {
		return <ErrorText refetch={refetch} texto={"os itens da op"} />;
	}
	if (data === undefined) {
		return <p>Ops</p>;
	}
	return <SAA data={data} />;
}
interface ISaaProps {
	data: IItemOp[];
}
function SAA(props: ISaaProps) {
	const navigate = useNavigate();
	const { toast } = useToast();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: "onBlur",
		defaultValues: {
			itens: props.data,
		},
	});
	const { fields } = useFieldArray({
		name: "itens",
		control: form.control,
	});
	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const result = new Map<string, number>();

			for (const item of values.itens) {
				console.log(item.id);
				result.set(item.id, item.quantidadeFabricada);
			}
			await faturarOp(result);
			navigate({ to: "/estatisticas/GanhoOpResumo", replace: true });
		} catch (e) {
			const b = e as Error;
			toast({
				variant: "destructive",
				title: "Erro ao faturar a op",
				description: `Erro: ${b.message}`,
			});
		}
	}
	return (
		<div className="flex flex-col justify-center items-center">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-4/5 space-y-6 "
				>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">Codigo</TableHead>
								<TableHead>Quantidade</TableHead>
								<TableHead>Quantidade Fabricada</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{fields.map((_, index) => {
								return (
									<TableRow key={index}>
										<TableCell>
											<FormField
												control={form.control}
												name={`itens.${index}.codigo`}
												render={({ field }) => (
													<FormItem>
														<FormControl>
															<p>{field.value}</p>
														</FormControl>
													</FormItem>
												)}
											/>
										</TableCell>
										<TableCell>
											<FormField
												control={form.control}
												name={`itens.${index}.quantidade`}
												render={({ field }) => (
													<FormItem>
														<FormControl>
															<p>{field.value}</p>
														</FormControl>
													</FormItem>
												)}
											/>
										</TableCell>
										<TableCell>
											<FormField
												control={form.control}
												name={`itens.${index}.quantidadeFabricada`}
												render={({ field }) => (
													<FormItem>
														<FormControl>
															<Input {...field} />
														</FormControl>
														<FormMessage className="text-danger capitalize" />
													</FormItem>
												)}
											/>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
					<Button type="submit">Enviar</Button>
				</form>
			</Form>
		</div>
	);
}
