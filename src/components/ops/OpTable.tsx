import type Op from "@/types/op";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface IProps {
	ops: Op[];
}

export default function OpTable(props: IProps) {
	return (
		<Table>
			<TableCaption>Uma lista de todas as Ops.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Numero</TableHead>
					<TableHead>Cliente</TableHead>
					<TableHead>Data</TableHead>
					<TableHead className="text-right">Status</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{props.ops.map((op) => (
					<TableRow key={op.id}>
						<TableCell className="font-medium">{op.numero}</TableCell>
						<TableCell>{op.cliente}</TableCell>
						<TableCell>
							{op.dataEntrega
								.toISOString()
								.split("T")[0]
								.split("-")
								.reverse()
								.join("/")}
						</TableCell>
						<TableCell className="text-right">{op.status}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
