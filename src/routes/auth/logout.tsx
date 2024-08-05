import { createFileRoute } from "@tanstack/react-router";
import { resetTokens } from "@/services/identity";
import { Navigate } from "@tanstack/react-router";

export default function Logout() {
	resetTokens();
	return <Navigate to={"/auth/login"} />;
}

export const Route = createFileRoute("/auth/logout")({
	component: () => <Logout />,
});
