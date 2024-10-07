import type { Table } from "@tanstack/react-table";

import { DataTableViewOptions } from "../DataTableViewOptions";
import { DataTableFacetedFilter } from "../DataTableFacetedFilter";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { XIcon } from "lucide-react";
import type { ITableFaceted } from "@/types/tableFaceted";
import type { escolhas } from "../ComboBox";

export interface DataTableToolbarProps<TData> {
	table: Table<TData>;
	seletor: ITableFaceted<string>[];
	ligas: Map<string, escolhas[]>;
}

export function EspessuraTableToolbar<TData>({
	table,
	seletor,
	ligas,
}: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				<Input
					placeholder="Filtrar Espessura..."
					value={(table.getColumn("numero")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("numero")?.setFilterValue(event.target.value)
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
				{table.getColumn("liga") && (
					<DataTableFacetedFilter
						column={table.getColumn("liga")}
						title="Ligas"
						options={getCurrentSeletor(
							table.getColumn("material")?.getFilterValue() as
								| string[]
								| undefined,
							ligas,
						)}
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

function getCurrentSeletor(
	values: string[] | undefined,
	ligas: Map<string, escolhas[]>,
): escolhas[] {
	const result = [] as escolhas[];
	console.log(values);
	if (values === undefined) {
		for (const material of ligas) {
			result.push(...material[1]);
		}
		console.log(ligas);
		return result;
	}
	for (let i = 0; i < values.length; i++) {
		const element = ligas.get(values[i]);
		if (element !== undefined) {
			result.push(...element);
		}
	}
	console.log(result);
	return result;
}
