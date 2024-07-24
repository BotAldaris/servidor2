import { resetTokens } from "@/services/identity";
import { Navigate } from "react-router-dom";

export default function Logout() {
	resetTokens();
	return <Navigate to={"/login"} />;
}
