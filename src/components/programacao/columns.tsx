import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import type { IItemProgramacao } from "@/types/itensOp";
import { XIcon } from "lucide-react";
import { format } from "date-fns";
import { ro } from "date-fns/locale";

export const programacaoColumns: ColumnDef<IItemProgramacao>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				className="translate-y-[2px]"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "codigo",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Codigo" />
		),
	},
	{
		accessorKey: "op",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="OP" />
		),
	},
	{
		accessorKey: "cliente",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Cliente" />
		),
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "material",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Material" />
		),
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "espessura",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Espessura" />
		),
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "tipo",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Tipo" />
		),
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "dataEntrega",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Data Entrega" />
		),
		cell: ({ row }) => format(row.getValue("dataEntrega"), "PPP"),
	},
	{
		accessorKey: "quantidade",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Quantidade" />
		),
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
			<DataTableColumnHeader column={column} title="Caldeiraria" />
		),
		cell: ({ row }) =>
			row.getValue("caldeiraria") ? (
				<XIcon className="mr-2 h-4 w-4 text-muted-foreground" />
			) : (
				""
			),
	},
];
