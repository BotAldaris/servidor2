import type { NumerosOps } from "@/types/op";
import type {
	RefetchOptions,
	QueryObserverResult,
} from "@tanstack/react-query";
import { Button } from "./ui/button";

interface IErrorProps<T> {
	refetch: (
		options?: RefetchOptions,
	) => Promise<QueryObserverResult<T[], Error>>;
	texto: string;
}

export default function ErrorText<T>(props: IErrorProps<T>) {
	return (
		<div>
			<p>Ocorreu um erro ao pegar {props.texto}, tente novamente.</p>
			<Button onClick={() => props.refetch()}>Tentar Novamente</Button>
		</div>
	);
}
