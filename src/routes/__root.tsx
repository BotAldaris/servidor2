import { Topbar } from "@/components/topbar";
import { Toaster } from "@/components/ui/toaster";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	Outlet,
} from "@tanstack/react-router";
interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => (
		<>
			<Topbar />
			<Outlet />
			<Toaster />
		</>
	),
});
