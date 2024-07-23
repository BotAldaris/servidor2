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
import { MapaOpDialogTable } from "./MapaOpDialogTable";
import { getOpsById } from "@/services/ops";
import {
	type QueryObserverResult,
	queryOptions,
	type RefetchOptions,
	useQuery,
} from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import type Op from "@/types/op";
import Loading from "../Loading";
import { useState } from "react";

interface IProps {
	numero: string;
	tipo: string;
	opId: string;
}

const opQuery = (opId: string) =>
	queryOptions({
		queryKey: ["op", opId],
		queryFn: () => getOpsById(opId),
	});
export default function MapaOpDialog(props: IProps) {
	const [clickado, setClickado] = useState(false);
	return (
		<Dialog onOpenChange={() => setClickado(!clickado)}>
			<DialogTrigger asChild>
				<Button variant="outline">{props.numero}</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Editar OP{props.numero}</DialogTitle>
					<DialogDescription>
						Modifique a Op Aqui. Cliquem em salvar quando você acabar.
					</DialogDescription>
				</DialogHeader>
				{clickado && <MapaOpDialogContent opId={props.opId} />}
				<DialogFooter>
					<Button type="submit">Salvar Mudanças</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
interface IMapaOpDialogContentProps {
	opId: string;
}
function MapaOpDialogContent(props: IMapaOpDialogContentProps) {
	const { data, isLoading, isError, refetch } = useQuery(opQuery(props.opId));
	if (isLoading) {
		return <Loading />;
	}
	if (isError) {
		<ErrorText refetch={refetch} />;
	}
	return <MapaOpDialogTable op={data} />;
}
interface IErrorProps {
	refetch: (
		options?: RefetchOptions,
	) => Promise<QueryObserverResult<Op, Error>>;
}

function ErrorText(props: IErrorProps) {
	return (
		<div>
			<p>Ocorreu um erro ao pegar os itens da op, tente novamente.</p>
			<Button onClick={() => props.refetch()}>Tentar Novamente</Button>
		</div>
	);
}
