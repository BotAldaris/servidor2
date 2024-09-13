import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { ItemPlanoOrcamento } from "@/types/orcamento";
import { formatDuration } from "date-fns";
interface IProps {
	venda: boolean;
	itens: ItemPlanoOrcamento[];
	espessura: number;
	valorLaser: number;
	valorMaterial: number;
	densidade: number;
}
export default function OrcamentoTableTable(props: IProps) {
	console.log(props.valorLaser);
	return (
		<Table>
			<TableCaption>Todos os itens do Orçamento.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Codigo</TableHead>
					<TableHead>Comprimento</TableHead>
					<TableHead>Largura</TableHead>
					<TableHead>Espessura</TableHead>
					<TableHead>Tempo</TableHead>
					<TableHead>Preço Laser</TableHead>
					{props.venda && <TableHead>Preço Material</TableHead>}
				</TableRow>
			</TableHeader>
			<TableBody>
				{props.itens.map((item) => (
					<TableRow key={item.codigo}>
						<TableCell className="font-medium">{item.codigo}</TableCell>
						<TableCell>{item.comprimento.toFixed(2)}</TableCell>
						<TableCell>{item.largura.toFixed(2)}</TableCell>
						<TableCell>{props.espessura}</TableCell>
						<TableCell>
							{formatDuration(
								{ seconds: item.tempo },
								{ format: ["minutes", "seconds"] },
							)}
						</TableCell>
						<TableCell>
							{((item.tempo * props.valorLaser) / 3600).toFixed(2)}
						</TableCell>
						{props.venda && (
							<TableCell>
								{(item.massa * props.densidade * props.valorMaterial).toFixed(
									2,
								)}
							</TableCell>
						)}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
