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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
const formSchema = z.object({
	numero: z.string(),
	tipo: z.coerce.number(),
});

type PdfFormValue = z.infer<typeof formSchema>;

interface IProps {
	callback: (dados: { numero: string; tipo: number }) => void;
}

export default function PdfForm(props: IProps) {
	const form = useForm<PdfFormValue>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			numero: "",
			tipo: 1,
		},
	});

	const onSubmit = async (data: PdfFormValue) => {
		props.callback(data);
	};

	return (
		<>
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
								<FormLabel>Numero</FormLabel>
								<FormControl>
									<Input placeholder="Digite seu numero..." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="tipo"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tipo</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value.toString()}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Selecione o que voce quer achar." />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="1">OP/OF</SelectItem>
										<SelectItem value="2">Plano</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className="ml-auto w-full" type="submit">
						Achar
					</Button>
				</form>
			</Form>
		</>
	);
}
