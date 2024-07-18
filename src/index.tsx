import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import PaginaErro from "./routes/PaginaErro";
import OPIndex from "./routes/ops";
import { AdicionarOP } from "./routes/ops/adicionar";
import AdicionarItemOP from "./routes/ops/item/adicionar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MapaHorasIndex, {
	loader as mapaHorasLoader,
} from "./routes/ops/mapaHoras";
import AdicionarMapa from "./routes/ops/mapaHoras/adicionar";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 10,
		},
	},
});

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <PaginaErro />,
		children: [
			{
				path: "ops",
				element: <OPIndex />,
			},
			{
				path: "ops/adicionar",
				element: <AdicionarOP />,
			},
			{
				path: "ops/item/adicionar",
				element: <AdicionarItemOP />,
			},
			{
				path: "ops/mapahoras",
				element: <MapaHorasIndex />,
				loader: mapaHorasLoader(queryClient),
				errorElement: <PaginaErro />,
			},
			{
				path: "ops/mapahoras/adicionar",
				element: <AdicionarMapa />,
			},
		],
	},
]);

const rootEl = document.getElementById("root");
if (rootEl) {
	const root = ReactDOM.createRoot(rootEl);
	root.render(
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</React.StrictMode>,
	);
}
