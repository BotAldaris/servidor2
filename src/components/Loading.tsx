import { LoaderCircle } from "lucide-react";

export default function Loading() {
	return (
		<div>
			<LoaderCircle className="animate-spin" />
			<p>Carregando</p>
		</div>
	);
}
