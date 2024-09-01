import type { Row } from "@tanstack/react-table";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { EllipsisIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "@tanstack/react-router";
import type IMapaHora from "@/types/mapaHoras";

interface DataTableRowActionsProps<TData> {
	modificarData: (id: string, quantidade: number) => void;
	row: Row<TData>;
}

export function MapaHorasRowActions<TData>({
	row,
	modificarData,
}: DataTableRowActionsProps<TData>) {
	const navigate = useNavigate();
	const mapa = row.original as IMapaHora;
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
				>
					<EllipsisIcon className="h-4 w-4" />
					<span className="sr-only">Abrir Menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[160px]">
				<DropdownMenuItem
					onClick={() =>
						navigate({
							to: "/ops/mapahoras/editar/$opId",
							params: { opId: mapa.id },
						})
					}
				>
					Editar
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>Adiar</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuItem onClick={() => modificarData(mapa.id, 1)}>
							1 dia
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => modificarData(mapa.id, 3)}>
							3 dia
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => modificarData(mapa.id, 7)}>
							7 dia
						</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
				<DropdownMenuSeparator />
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>Antecipar</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuItem onClick={() => modificarData(mapa.id, -1)}>
							1 dia
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => modificarData(mapa.id, -3)}>
							3 dia
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => modificarData(mapa.id, -7)}>
							7 dia
						</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					Delete
					<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
