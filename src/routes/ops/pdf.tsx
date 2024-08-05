import { createFileRoute } from "@tanstack/react-router";
import Loading from "@/components/Loading";
import PdfForm from "@/components/pdf/PdfForm";
import { getPDF } from "@/services/ops";
import type { PostPdf } from "@/types/op";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ErrorText from "@/components/errorText";

const acharPdfListQuery = (data: PostPdf) =>
	queryOptions({
		queryKey: ["pdf", data.numero, data.tipo],
		queryFn: () => getPDF(data),
	});

function AcharPdf() {
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
				<ErrorText refetch={refetch} texto="os links" />
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

export const Route = createFileRoute("/ops/pdf")({
	component: () => <AcharPdf />,
});
