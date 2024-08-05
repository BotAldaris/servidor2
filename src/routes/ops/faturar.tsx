import { createFileRoute } from "@tanstack/react-router";
import FaturaTableContent from "@/components/ops/faturar/FaturarItemTable";
import FaturarOpDialog from "@/components/ops/faturar/FaturarOpDialog";
import { useState } from "react";

function FaturarOp() {
	const [id, setId] = useState<string | null>(null);
	const [numero, setNumero] = useState<string | null>(null);
	
	return (
		<div className="flex flex-col justify-center items-center w-full">
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

export const Route = createFileRoute("/ops/faturar")({
	component: () => <FaturarOp />,
});
