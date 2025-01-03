import type { HistoryTablePayload } from "@/types/database";
import DOMPurify from "dompurify";
import type { FC } from "react";

const HTML: FC<Partial<HistoryTablePayload>> = (props) => {
	const { value = "" } = props;
	const containerRef = useRef<HTMLDivElement>(null);

	useMount(() => {
		if (!containerRef.current) return;

		const links = containerRef.current.querySelectorAll("a");

		for (const link of links) {
			link.removeAttribute("target");
		}
	});

	useEventListener(
		"click",
		(event) => {
			const { target, metaKey, ctrlKey } = event;

			const link = (target as HTMLElement).closest("a");

			if (!link || metaKey || ctrlKey) return;

			event.preventDefault();
			event.stopPropagation();
		},
		{
			target: containerRef,
		},
	);

	return (
		<div
			ref={containerRef}
			className="translate-z-0"
			dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }}
		/>
	);
};

export default memo(HTML);
