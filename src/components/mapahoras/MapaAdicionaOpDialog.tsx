import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDownCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "../ui/form";
import { format } from "date-fns";
import { useState } from "react";

const formSchema = z.object({
	numero: z.string(),
	observacao: z.string(),
});

export type MapaAdicionarFormValue = z.infer<typeof formSchema>;

interface IProps {
	date: Date;
	callback: (
		dados: MapaAdicionarFormValue,
		setOpen: React.Dispatch<React.SetStateAction<boolean>>,
	) => void;
}

export default function MapaAdicionarOpDialog(props: IProps) {
	const [open, setOpen] = useState(false);
	const form = useForm<MapaAdicionarFormValue>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			numero: "",
			observacao: "",
		},
	});
	function onSubmit(dados: MapaAdicionarFormValue) {
		props.callback(dados, setOpen);
	}
	const data = format(props.date, "PPP");
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<ArrowDownCircleIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Adicionar uma Op em {data}</DialogTitle>
					<DialogDescription>
						Adicione uma Op no mapa de horas em {data}. Click em salvar quando
						acabar.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full space-y-2"
					>
						<FormField
							control={form.control}
							name="numero"
							render={({ field }) => (
								<FormItem>
									<FormLabel>OP</FormLabel>
									<FormControl>
										<Input placeholder="Digite o numero da OP..." {...field} />
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
									<FormLabel>Observacao</FormLabel>
									<FormControl>
										<Input
											placeholder="Digite se tiver uma observacao."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button className="ml-auto w-full" type="submit">
								Salvar Mudancas
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
