import FaturaTableContent from "@/components/ops/faturar/FaturarItemTable";
import FaturarOpDialog from "@/components/ops/faturar/FaturarOpDialog";
import { useState } from "react";

export default function FaturarOp() {
	const [id, setId] = useState<string | null>(null);
	const [numero, setNumero] = useState<string | null>(null);

	return (
		<div>
			<FaturarOpDialog
				setId={setId}
				id={id}
				numero={numero}
				setNumero={setNumero}
			/>
			{id === null ? (
				<p>Selecione uma op para comecar a faturar.</p>
			) : (
				<FaturaTableContent id={id} />
			)}
		</div>
	);
}
