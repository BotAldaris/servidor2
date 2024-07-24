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
import { addRoleToUser } from "@/services/roles";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export default function AdicionarRoleParaAlguem() {
	return (
		<div className="flex  flex-col justify-center items-center w-full">
			<RoleForm />
		</div>
	);
}

const formSchema = z.object({
	role: z.string().min(2, {
		message: "O Cargo tem que ter pelo menos 2 characteres.",
	}),
	email: z.string().email("Tem que ser um email"),
});

function RoleForm() {
	const navigate = useNavigate();
	const { toast } = useToast();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			await addRoleToUser(values);
			navigate("/roles", { replace: true });
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
					name="role"
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
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
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
