import { createFileRoute } from "@tanstack/react-router";
import type { z } from "zod";
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
import { useToast } from "@/components/ui/use-toast";
import { type IMapaHoraSimple, MapaHora } from "@/types/mapaHoras";
import { getMapaHoraById, saveMapaHoraApi } from "@/services/MapaHoras";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "@tanstack/react-router";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

const editarMapaHoraQuery = (num: string) =>
	queryOptions({
		queryKey: ["mapaHora", num],
		queryFn: () => getMapaHoraById(num),
	});

function AdicionarMapa() {
	const { opId } = Route.useParams();
	const postsQuery = useSuspenseQuery(editarMapaHoraQuery(opId));
	const result = postsQuery.data;
	return (
		<div className="flex  flex-col justify-center items-center w-full">
			<MapaForm dados={result} />
		</div>
	);
}
interface IMapaFormProps {
	dados: IMapaHoraSimple;
}
function MapaForm({ dados }: IMapaFormProps) {
	const navigate = useNavigate();
	const { toast } = useToast();
	const form = useForm<z.infer<typeof MapaHora>>({
		resolver: zodResolver(MapaHora),
		defaultValues: {
			observacao: dados.observacao,
			opId: dados.opId,
			data: dados.data,
		},
	});
	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof MapaHora>) {
		try {
			await saveMapaHoraApi({ ...values });
			navigate({ to: "/ops/mapahoras", replace: true });
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
					name="opId"
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
					name="observacao"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Observação</FormLabel>
							<FormControl>
								<Input placeholder="FMP" {...field} value={""} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="data"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Data</FormLabel>
							<FormControl>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													"w-[240px] pl-3 text-left font-normal",
													!field.value && "text-muted-foreground",
												)}
											>
												{field.value ? (
													field.value
														.toISOString()
														.split("T")[0]
														.split("-")
														.reverse()
														.join("/")
												) : (
													<span>Escolha uma data</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
										/>
									</PopoverContent>
								</Popover>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Editar</Button>
			</form>
		</Form>
	);
}
export const Route = createFileRoute("/ops/mapahoras/editar/$opId")({
	loader: ({ context: { queryClient }, params }) => {
		queryClient.ensureQueryData(editarMapaHoraQuery(params.opId));
	},
	component: () => <AdicionarMapa />,
});
