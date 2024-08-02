import Loading from "@/components/Loading";
import PdfForm from "@/components/pdf/PdfForm";
import { Button } from "@/components/ui/button";
import { getPDF } from "@/services/ops";
import type { PostPdf } from "@/types/op";
import {
	type QueryObserverResult,
	queryOptions,
	type RefetchOptions,
	useQuery,
} from "@tanstack/react-query";
import { useState } from "react";

const acharPdfListQuery = (data: PostPdf) =>
	queryOptions({
		queryKey: ["pdf", data.numero, data.tipo],
		queryFn: () => getPDF(data),
	});

export default function AcharPdf() {
	const [postPdf, setPostPdf] = useState<PostPdf>();
	return (
		<div className="flex flex-col justify-center items-center w-full">
			<div className="w-3/4">
				<PdfForm callback={setPostPdf} />
				<PdfIndex postPdf={postPdf} />
			</div>
		</div>
	);
}

interface IPropsPdfIndex {
	postPdf: PostPdf | undefined;
}

function PdfIndex(props: IPropsPdfIndex) {
	if (props.postPdf === undefined) {
		return;
	}
	const { data, isLoading, isError, refetch } = useQuery(
		acharPdfListQuery(props.postPdf),
	);
	return (
		<div>
			{isLoading ? (
				<Loading />
			) : isError ? (
				<ErrorText refetch={refetch} />
			) : (
				<div className="flex flex-col">
					{data?.map((x) => (
						<a key={x} href={x} target="_blank" rel="noreferrer">
							{x}
						</a>
					))}
				</div>
			)}
		</div>
	);
}
interface IErrorProps {
	refetch: (
		options?: RefetchOptions,
	) => Promise<QueryObserverResult<string[], Error>>;
}

function ErrorText(props: IErrorProps) {
	return (
		<div>
			<p>Ocorreu um erro ao pegar os links, tente novamente.</p>
			<Button onClick={() => props.refetch()}>Tentar Novamente</Button>
		</div>
	);
}
