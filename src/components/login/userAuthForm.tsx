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
import type { Logar } from "@/types/Roles";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z
	.object({
		email: z.string().email({ message: "Enter a valid email address" }),
		password: z.string(),
	})
	.superRefine(({ password }, checkPassComplexity) => {
		const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
		const containsLowercase = (ch: string) => /[a-z]/.test(ch);
		const containsSpecialChar = (ch: string) =>
			/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
		let countOfUpperCase = 0;
		let countOfLowerCase = 0;
		let countOfNumbers = 0;
		let countOfSpecialChar = 0;
		for (let i = 0; i < password.length; i++) {
			const ch = password.charAt(i);
			if (!Number.isNaN(+ch)) countOfNumbers++;
			else if (containsUppercase(ch)) countOfUpperCase++;
			else if (containsLowercase(ch)) countOfLowerCase++;
			else if (containsSpecialChar(ch)) countOfSpecialChar++;
		}
		if (
			countOfLowerCase < 1 ||
			countOfUpperCase < 1 ||
			countOfSpecialChar < 1 ||
			countOfNumbers < 1
		) {
			checkPassComplexity.addIssue({
				code: "custom",
				message:
					"A senha tem que conter 1 numero, 1 letra minúscula, 1 letra maiúscula e 1 caracter especiial.",
			});
		}
	});

type UserFormValue = z.infer<typeof formSchema>;

interface IProps {
	nome: string;
	callback: (dados: Logar) => void;
}

export default function UserAuthForm(props: IProps) {
	const form = useForm<UserFormValue>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit = async (data: UserFormValue) => {
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
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="Digite seu email..."
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Senha</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="Digite a senha."
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className="ml-auto w-full" type="submit">
						{props.nome}
					</Button>
				</form>
			</Form>
		</>
	);
}
