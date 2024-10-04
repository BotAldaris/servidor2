import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import {
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	type VisibilityState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { type ElementType, useState } from "react";
import { Input } from "@/components/ui/input";
import DataTablePagination from "./DataTablePagination";
interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	filter: string;
	nome: string;
	Toolbar?: ElementType;
}

export default function DataTableBase<TData, TValue>({
	columns,
	data,
	filter,
	nome,
	Toolbar,
}: DataTableProps<TData, TValue>) {
const [columnVisibility, setColumnVisibility] =
	useState<VisibilityState>({});
const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
	[],
);
const [sorting, setSorting] = useState<SortingState>([]);

const table = useReactTable({
	data,
	columns,
	state: {
		sorting,
		columnVisibility,
		columnFilters,
	},
	onSortingChange: setSorting,
	onColumnFiltersChange: setColumnFilters,
	onColumnVisibilityChange: setColumnVisibility,
	getCoreRowModel: getCoreRowModel(),
	getFilteredRowModel: getFilteredRowModel(),
	getPaginationRowModel: getPaginationRowModel(),
	getSortedRowModel: getSortedRowModel(),
	getFacetedRowModel: getFacetedRowModel(),
	getFacetedUniqueValues: getFacetedUniqueValues(),
});
console.log(table.getState())
	return (
		<div>
			{Toolbar === undefined ? (
				<div className="flex items-center py-4">
					<Input
						placeholder={`Filtrar ${nome}...`}
						value={(table.getColumn(filter)?.getFilterValue() as string) ?? ""}
						onChange={(event) =>
							table.getColumn(filter)?.setFilterValue(event.target.value)
						}
						className="max-w-sm"
					/>
				</div>
			) : (
				
				<Toolbar table={table}/>
			)}

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									Nenhum resultado.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<DataTablePagination table={table} />
		</div>
	);
}
