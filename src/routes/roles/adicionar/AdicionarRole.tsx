import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function AdicionarRole() {
	return (
		<div>
			<RoleForm />
		</div>
	);
}

const formSchema = z.object({
	nome: z.string().min(2, {
		message: "O Cargo tem que terr pelo menos 2 characteres.",
	}),
});

function RoleForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nome: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
