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
import { getNumerosOps } from "@/services/ops";
import { queryOptions, useQuery } from "@tanstack/react-query";
import Loading from "../../Loading";
import { useState } from "react";
import ResumoOpTable from "../ResumoOpTable";
import type { NumerosOps } from "@/types/op";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../DataTableColumnHeader";
import { Checkbox } from "../../ui/checkbox";
import ErrorText from "@/components/errorText";

interface IProps {
	numero: string | null;
	id: string | null;
	setId: React.Dispatch<React.SetStateAction<string | null>>;
	setNumero: React.Dispatch<React.SetStateAction<string | null>>;
}

const itensOpQuery = () =>
	queryOptions({
		queryKey: ["NumerosOps"],
		queryFn: () => getNumerosOps(),
	});
export default function FaturarOpDialog(props: IProps) {
	const [clickado, setClickado] = useState(false);
	return (
		<div>
			<Dialog onOpenChange={() => setClickado(!clickado)}>
				<DialogTrigger asChild>
					<Button variant="outline">
						{props.numero == null ? "Selecione uma Op" : props.numero}
					</Button>
				</DialogTrigger>
				<DialogContent className="w-xl">
					<DialogHeader>
						<DialogTitle>Selecione uma OP{props.numero}</DialogTitle>
						<DialogDescription>
							Ache a Op que você quer faturar aqui. Clique em salvar quando você
							achar.
						</DialogDescription>
					</DialogHeader>
					{clickado && (
						<FaturarOpDialogContent
							id={props.id}
							setId={props.setId}
							numero={props.numero}
							setNumero={props.setNumero}
						/>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}

interface IFaturarOpContent {
	id: string | null;
	numero: string | null;
	setNumero: React.Dispatch<React.SetStateAction<string | null>>;
	setId: React.Dispatch<React.SetStateAction<string | null>>;
}

function FaturarOpDialogContent(props: IFaturarOpContent) {
	const { data, isLoading, isError, refetch } = useQuery(itensOpQuery());
	if (isLoading) {
		return <Loading />;
	}
	if (isError) {
		return <ErrorText refetch={refetch} texto={"os itens da op"} />;
	}
	if (data === undefined) {
		return <p>Ops</p>;
	}
	return (
		<SAA
			id={props.id}
			numero={props.numero}
			setNumero={props.setNumero}
			setId={props.setId}
			data={data}
		/>
	);
}

interface ISaaProps {
	data: NumerosOps[];
	setNumero: React.Dispatch<React.SetStateAction<string | null>>;
	numero: string | null;
	id: string | null;
	setId: React.Dispatch<React.SetStateAction<string | null>>;
}
function SAA(props: ISaaProps) {
	const [selected, setSeleted] = useState<string | null>(props.id);
	const [numero, setNumero] = useState<string | null>(props.numero);

	const handleCheckboxChange = (id: string, num: string) => {
		setSeleted(id);
		setNumero(numero);
	};
	return (
		<>
			<ResumoOpTable
				data={props.data}
				columns={generateColumns(handleCheckboxChange, selected)}
			/>
			<DialogFooter>
				<DialogTrigger asChild>
					<Button type="submit" onClick={() => props.setId(selected)}>
						Salvar Mudanças
					</Button>
				</DialogTrigger>
			</DialogFooter>
		</>
	);
}

function generateColumns(
	set: (id: string, num: string) => void,
	selecionado: string | null,
) {
	const columns: ColumnDef<NumerosOps>[] = [
		{
			accessorKey: "Numero",
			header: ({ column }) => {
				return <DataTableColumnHeader title="Numero" column={column} />;
			},
		},
		{
			accessorKey: "quantidade",
			header: ({ column }) => {
				return <DataTableColumnHeader title="Quantidade" column={column} />;
			},
		},
		{
			accessorKey: "selecionar",
			header: ({ column }) => {
				return <DataTableColumnHeader title={"Selecionado"} column={column} />;
			},
			cell: ({ cell, row }) =>
				cell.getValue() === null ? (
					<div />
				) : (
					<Checkbox
						checked={row.original.id === selecionado}
						onCheckedChange={() => set(row.original.id, row.original.numero)}
						aria-label="Selecionar op"
					/>
				),
		},
	];
	return columns;
}
