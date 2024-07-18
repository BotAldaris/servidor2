import { z } from "zod";
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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { Calendar } from "../../components/ui/calendar";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";
import { tipoEnum } from "../../types/tipoEnum";
import { saveOpApi } from "@/services/ops";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
	numero: z.string().max(255, "O numero pode ter no máximo 255 caracteres"),
	cliente: z.string().max(255, "O cliente pode ter no máximo 255 caracteres"),
	dataLiberacao: z.coerce.date({
		required_error: "Por favor coloque a data de liberação",
		invalid_type_error: "Tem que ser uma data!",
	}),
	dataEntrega: z.coerce.date({
		required_error: "Por favor coloque a data de entrega",
		invalid_type_error: "Tem que ser uma data!",
	}),
	tipo: z.enum(tipoEnum),
});
function OpForm() {
	const navigate = useNavigate();
	const { toast } = useToast();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			numero: "",
			cliente: "",
			tipo: "BENEF",
		},
	});
	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			await saveOpApi({ ...values, status: "Programando" });
			navigate("/ops", { replace: true });
		} catch (e) {
			toast({
				variant: "destructive",
				title: "Erro ao salvar a op",
				description: `Erro: ${e}`,
			});
			console.log("oi");
			console.log(e);
		}
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 ">
				<FormField
					control={form.control}
					name="numero"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Numero</FormLabel>
							<FormControl>
								<Input placeholder="0999-99" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="cliente"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Cliente</FormLabel>
							<FormControl>
								<Input placeholder="Laser Prime" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex flex-row justify-between">
					<FormField
						control={form.control}
						name="dataLiberacao"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Data Liberação</FormLabel>
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
					<FormField
						control={form.control}
						name="dataEntrega"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Data entrega</FormLabel>
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
				</div>
				<FormField
					control={form.control}
					name="tipo"
					render={({ field }) => (
						<div>
							<FormItem>
								<FormLabel>Tipo</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Selecione o tipo" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="BENEF">Beneficiamento</SelectItem>
										<SelectItem value="VENDA">Venda</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						</div>
					)}
				/>
				<Button type="submit">Enviar</Button>
			</form>
		</Form>
	);
}
export function AdicionarOP() {
	return (
		<div className="flex  flex-col justify-center items-center w-full">
			<OpForm />
		</div>
	);
}
