import type { Table } from "@tanstack/react-table";

import { DataTableViewOptions } from "../DataTableViewOptions";
import { DataTableFacetedFilter } from "../DataTableFacetedFilter";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { XIcon } from "lucide-react";
import type { ITableFaceted } from "@/types/tableFaceted";

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
	clientes: ITableFaceted<string>[];
	ops: ITableFaceted<string>[];
	materiais: ITableFaceted<string>[];
	espessuras: ITableFaceted<number>[];
}
const tipo = [
	{ label: "BENEF", value: "Beneficiamento" },
	{ label: "VENDA", value: "Venda" },
] as ITableFaceted<string>[];

export function DataTableToolbar<TData>({
	table,
	clientes,
	ops,
	materiais,
	espessuras,
}: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				<Input
					placeholder="Filtrar Codigos..."
					value={(table.getColumn("codigo")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("codigo")?.setFilterValue(event.target.value)
					}
					className="h-8 w-[150px] lg:w-[250px]"
				/>
				{table.getColumn("cliente") && (
					<DataTableFacetedFilter
						column={table.getColumn("cliente")}
						title="Clientes"
						options={clientes}
					/>
				)}
				{table.getColumn("op") && (
					<DataTableFacetedFilter
						column={table.getColumn("op")}
						title="Op"
						options={ops}
					/>
				)}
				{table.getColumn("material") && (
					<DataTableFacetedFilter
						column={table.getColumn("material")}
						title="Material"
						options={materiais}
					/>
				)}
				{table.getColumn("espessura") && (
					<DataTableFacetedFilter
						column={table.getColumn("espessura")}
						title="Espessura"
						options={espessuras}
					/>
				)}
				{table.getColumn("tipo") && (
					<DataTableFacetedFilter
						column={table.getColumn("tipo")}
						title="Tipo"
						options={tipo}
					/>
				)}
				{isFiltered && (
					<Button
						variant="ghost"
						onClick={() => table.resetColumnFilters()}
						className="h-8 px-2 lg:px-3"
					>
						Reset
						<XIcon className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>
			<DataTableViewOptions table={table} />
		</div>
	);
}
