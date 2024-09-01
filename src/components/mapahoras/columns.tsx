import type IMapaHora from "@/types/mapaHoras";
import { addHours, intervalToDuration } from "date-fns";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import { XIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MapaHorasRowActions } from "./MapaHorasRowAction";

function valorParaHora(data: Date, valor: number) {
	const duration = intervalToDuration({
		start: data,
		end: addHours(data, valor / 500),
	});
	return `${duration.hours === undefined ? "00" : addPaddingStart(duration.hours)}:${duration.minutes === undefined ? "00" : addPaddingStart(duration.minutes)}:${duration.seconds === undefined ? "00" : addPaddingStart(duration.seconds)}`;
}

function addPaddingStart(numero: number) {
	if (numero > 10) {
		return numero.toString();
	}
	return `0${numero}`;
}
export function mapaHoraColumns(
	modificarData: (id: string, quantidade: number) => void,
): ColumnDef<IMapaHora>[] {
	return [
		{
			accessorKey: "numeroOp",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Op" />
			),
		},
		{
			accessorKey: "cliente",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Cliente" />
			),
		},
		{
			accessorKey: "dataLiberacao",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Data Liberacao" />
			),
			cell: ({ row }) =>
				format(row.getValue("dataLiberacao"), "PP", { locale: ptBR }),
		},
		{
			accessorKey: "dataEntrega",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Data Entrega" />
			),
			cell: ({ row }) =>
				format(row.getValue("dataEntrega"), "PP", { locale: ptBR }),
		},
		{
			accessorKey: "tipo",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Tipo" />
			),
		},

		{
			accessorKey: "valorCorte",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Valor Corte" />
			),
		},
		{
			accessorKey: "Tempo",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Tempo Corte" />
			),
			cell: ({ row }) => valorParaHora(new Date(), row.getValue("valorCorte")),
		},
		{
			accessorKey: "dobra",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Dobra" />
			),
			cell: ({ row }) =>
				row.getValue("dobra") ? (
					<XIcon className="mr-2 h-4 w-4 text-muted-foreground" />
				) : (
					""
				),
		},
		{
			accessorKey: "caldeiraria",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Cald" />
			),
			cell: ({ row }) =>
				row.getValue("caldeiraria") ? (
					<XIcon className="mr-2 h-4 w-4 text-muted-foreground" />
				) : (
					""
				),
		},
		{
			accessorKey: "observacao",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Obs" />
			),
		},
		{
			accessorKey: "status",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Status" />
			),
		},
		{
			id: "actions",
			cell: ({ row }) => (
				<MapaHorasRowActions row={row} modificarData={modificarData} />
			),
		},
	] as ColumnDef<IMapaHora>[];
}
