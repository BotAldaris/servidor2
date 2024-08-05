import { createFileRoute } from "@tanstack/react-router";
import LoginTopbar from "@/components/login/LoginTopBar";
import UserAuthForm from "@/components/login/userAuthForm";
import { useToast } from "@/components/ui/use-toast";
import { logar } from "@/services/identity";
import type { Logar } from "@/types/Roles";
import { useNavigate } from "@tanstack/react-router";

function Login() {
	const navigate = useNavigate();
	const { toast } = useToast();

	async function entrar(dados: Logar) {
		try {
			await logar(dados);
			navigate({ to: "/", replace: true });
		} catch (e) {
			toast({
				variant: "destructive",
				title: "Erro ao logar",
				description: `Erro: ${e}`,
			});
		}
	}
	return (
		<div>
			<LoginTopbar />
			<div className="flex  content-center justify-center	">
				<div className="w-3/4">
					<h1>Login</h1>
					<UserAuthForm nome="Logar" callback={entrar} />
				</div>
			</div>
		</div>
	);
}

export const Route = createFileRoute("/auth/login")({
	component: () => <Login />,
});
