import { createFileRoute } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { saveRole } from "@/services/roles";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "@tanstack/react-router";

function AdicionarRole() {
	return (
		<div className="flex  flex-col justify-center items-center w-full">
			<RoleForm />
		</div>
	);
}

const formSchema = z.object({
	nome: z.string().min(2, {
		message: "O Cargo tem que ter pelo menos 2 characteres.",
	}),
});

function RoleForm() {
	const navigate = useNavigate();
	const { toast } = useToast();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nome: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			await saveRole({ ...values });
			navigate({ to: "/roles", replace: true });
		} catch (e) {
			const b = e as Error;
			toast({
				variant: "destructive",
				title: "Erro ao salvar o cargo",
				description: `Erro: ${b.message}`,
			});
			console.log(e);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-2/3">
				<FormField
					control={form.control}
					name="nome"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome do Cargo</FormLabel>
							<FormControl>
								<Input placeholder="Programador" {...field} />
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

export const Route = createFileRoute("/roles/adicionar")({
	component: () => <AdicionarRole />,
});
