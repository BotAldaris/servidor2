import type { Table } from "@tanstack/react-table";

import { DataTableViewOptions } from "../DataTableViewOptions";
import { DataTableFacetedFilter } from "../DataTableFacetedFilter";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { XIcon } from "lucide-react";
import type { ITableFaceted } from "@/types/tableFaceted";

export interface DataTableToolbarProps<TData> {
	table: Table<TData>;
	seletor: ITableFaceted<string>[];
}

export function LigasTableToolbar<TData>({
	table,
	seletor,
}: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				<Input
					placeholder="Filtrar Nomes..."
					value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("nome")?.setFilterValue(event.target.value)
					}
					className="h-8 w-[150px] lg:w-[250px]"
				/>
				{table.getColumn("material") && (
					<DataTableFacetedFilter
						column={table.getColumn("material")}
						title="Materiais"
						options={seletor}
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
