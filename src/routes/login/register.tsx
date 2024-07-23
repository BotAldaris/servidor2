import LoginTopbar from "@/components/login/LoginTopBar";
import UserAuthForm from "@/components/login/userAuthForm";
import { useToast } from "@/components/ui/use-toast";
import { register } from "@/services/identity";
import type { Logar } from "@/types/Roles";
import { useNavigate } from "react-router-dom";

export default function Registrar() {
	const navigate = useNavigate();
	const { toast } = useToast();

	async function entrar(dados: Logar) {
		try {
			await register(dados);
			navigate("/login", { replace: true });
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
					<h1>Registrar</h1>
					<UserAuthForm nome="Registrar" callback={entrar} />
				</div>
			</div>
		</div>
	);
}
