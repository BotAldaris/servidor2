import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/services/identity";
import type { ReactNode } from "react";
interface ProtectedRouteProps {
	children: ReactNode;
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	if (!isAuthenticated()) {
		return <Navigate to="/login" replace />;
	}

	return children;
};

export default ProtectedRoute;
