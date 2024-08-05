import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/PaginaErro")({
	component: () => <div>Hello /PaginaErro!</div>,
});
