import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import PaginaErro from "./routes/PaginaErro";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loader as mapaHorasLoader } from "./routes/ops/mapaHoras";
import ProtectedRoute from "./routes/ProtectedRoute";
import { loader as rolesIndexLoader } from "./routes/roles/RolesIndex";
import { loader as resumoOpLoader } from "./routes/ops/resumo";

const Login = lazy(() => import("./routes/login/login"));
const Registrar = lazy(() => import("./routes/login/register"));
const Logout = lazy(() => import("./routes/login/logout"));

const AdicionarRole = lazy(
	() => import("./routes/roles/adicionar/AdicionarRole"),
);
const AdicionarRoleParaAlguem = lazy(
	() => import("./routes/roles/adicionar/AdicionarRoleParaAlguem"),
);
const RolesIndex = lazy(() => import("./routes/roles/RolesIndex"));

const MapaHorasIndex = lazy(() => import("./routes/ops/mapaHoras"));
const ResumoOpIndex = lazy(() => import("./routes/ops/resumo"));

const AdicionarOP = lazy(() => import("./routes/ops/adicionar"));
const AdicionarMapa = lazy(() => import("./routes/ops/mapaHoras/adicionar"));
const AdicionarItemOP = lazy(() => import("./routes/ops/item/adicionar"));
const AcharPdf = lazy(() => import("./routes/pdf/AcharPdf"));
const FaturarOp = lazy(() => import("./routes/ops/faturar"));
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 10,
		},
	},
});

const router = createBrowserRouter([
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Registrar />,
	},
	{
		path: "/logout",
		element: <Logout />,
	},
	{
		path: "/",
		element: (
			<ProtectedRoute>
				<Root />
			</ProtectedRoute>
		),
		errorElement: <PaginaErro />,
		children: [
			{
				path: "ops/resumo",
				element: <ResumoOpIndex />,
				loader: resumoOpLoader(queryClient),
				errorElement: <PaginaErro />,
			},
			{
				path: "ops/pdf",
				element: <AcharPdf />,
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
				path: "ops/faturar",
				element: <FaturarOp />,
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
			{
				path: "roles",
				element: <RolesIndex />,
				loader: rolesIndexLoader(queryClient),
			},
			{
				path: "roles/adicionar",
				element: <AdicionarRole />,
			},
			{
				path: "roles/user/adicionar",
				element: <AdicionarRoleParaAlguem />,
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
