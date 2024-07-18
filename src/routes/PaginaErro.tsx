import { useRouteError } from "react-router-dom";

type routeError = {
	message: string;
	statusText: string;
};

export default function PaginaErro() {
	const error = useRouteError() as routeError;
	console.error(error);

	return (
		<div id="error-page">
			<h1>Oops!</h1>
			<p>Desculpas, um erro inesperado aconteceu.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	);
}
