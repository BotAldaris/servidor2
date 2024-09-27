import { type PostMaterialRequest, ZMaterial } from "@/types/materiais";
import { useNavigate } from "@tanstack/react-router";
import { useToast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface IProps {
	onSubmit: (values: z.infer<typeof ZMaterial>) => void;
	material: PostMaterialRequest;
}

export function MaterialForm(props: IProps) {
	const form = useForm<z.infer<typeof ZMaterial>>({
		resolver: zodResolver(ZMaterial),
		defaultValues: { ...props.material },
	});
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(props.onSubmit)}
				className="w-2/3 space-y-6 "
			>
				<FormField
					control={form.control}
					name="nome"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome do Material</FormLabel>
							<FormControl>
								<Input placeholder="Carbono" {...field} />
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
