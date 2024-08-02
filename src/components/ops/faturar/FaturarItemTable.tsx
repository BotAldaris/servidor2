import { getItensOpsByOpId } from "@/services/ops";
import { queryOptions, useQuery } from "@tanstack/react-query";
import Loading from "../../Loading";
import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../DataTableColumnHeader";
import { Input } from "@/components/ui/input";
import type { IItemOp } from "@/types/itensOp";
import FaturarOpDialogTable from "./FaturarOpDialogTable";
import ErrorText from "@/components/errorText";

interface IProps {
	id: string;
}

const itensOpQuery = (id: string) =>
	queryOptions({
		queryKey: ["itensOp", id],
		queryFn: () => getItensOpsByOpId(id),
	});

export default function FaturaTableContent(props: IProps) {
	const { data, isLoading, isError, refetch } = useQuery(
		itensOpQuery(props.id),
	);
	if (isLoading) {
		return <Loading />;
	}
	if (isError) {
		return <ErrorText refetch={refetch} texto={"os itens da op"} />;
	}
	if (data === undefined) {
		return <p>Ops</p>;
	}
	return <SAA data={data} />;
}
interface ISaaProps {
	data: IItemOp[];
}
function SAA(props: ISaaProps) {
	const [data, setData] = useState(props.data);
	const handleCheckboxChange = (id: string, column: string, value: string) => {
		setData((prevData) =>
			prevData.map((item) => {
				if (item.id === id) {
					return { ...item, [column]: Number.parseFloat(value) };
				}
				return item;
			}),
		);
	};
	return (
		<>
			<FaturarOpDialogTable
				data={data}
				columns={generateColumns(handleCheckboxChange)}
			/>
		</>
	);
}

function generateColumns(
	set: (id: string, column: string, value: string) => void,
) {
	const columns: ColumnDef<IItemOp>[] = [
		{
			accessorKey: "codigo",
			header: ({ column }) => {
				return <DataTableColumnHeader title="Codigo" column={column} />;
			},
		},
		{
			accessorKey: "quantidade",
			header: ({ column }) => {
				return <DataTableColumnHeader title="Quantidade" column={column} />;
			},
		},
		{
			accessorKey: "quantidadeFabricada",
			header: ({ column }) => {
				return (
					<DataTableColumnHeader
						title={"Quantidade Fabricada"}
						column={column}
					/>
				);
			},
			cell: ({ cell, row, column }) =>
				cell.getValue() === null ? (
					<div />
				) : (
					<Input
						type="number"
						onChange={(i) => set(row.original.id, column.id, i.target.value)}
					/>
				),
		},
	];

	return columns;
}
