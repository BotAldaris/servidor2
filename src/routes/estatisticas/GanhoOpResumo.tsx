import { createFileRoute } from "@tanstack/react-router";

function GanhoOPResumo() {
	return <p>oi</p>;
}

export const Route = createFileRoute("/estatisticas/GanhoOpResumo")({
	component: () => <GanhoOPResumo />,
});
