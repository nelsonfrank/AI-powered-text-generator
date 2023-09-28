import { useSession } from "next-auth/react";
import ChatAvatar from "./chat-avatar";
import { getUserInitials } from "@/utils";
import { useEffect, useState } from "react";

interface ChatMessageProps {
	position: "left" | "right";
	message: string | ReadableStream<Uint8Array>;
}

const ChatMessage = ({ position, message }: ChatMessageProps) => {
	const { data: session } = useSession();
	const [response, setResponse] = useState("");

	const parser = new DOMParser();

	function replaceWithBr() {
		return response?.replace(/\n/g, "<br />");
	}

	const decodeMessage = async (
		data: ReadableStream<Uint8Array> | null | string
	) => {
		if (!data || typeof data === "string") return;
		const reader = data.getReader();
		const decoder = new TextDecoder();
		let done = false;

		let aiResponse: string = "";
		while (!done) {
			const { value, done: doneReading } = await reader.read();
			done = doneReading;
			const chunkValue = decoder.decode(value);
			aiResponse += chunkValue;
			setResponse((prev) => prev + chunkValue);
		}
	};

	useEffect(() => {
		if (position === "left") {
			console.log({ message });
			decodeMessage(message);
		}
	}, [message, position]);

	console.log({ response });
	const parsedMessage =
		typeof message === "string"
			? parser.parseFromString(message, "text/html").body.textContent
			: "";

	if (position === "left") {
		return (
			<div className='flex gap-4 mb-4'>
				<ChatAvatar name='AI' />
				<div>
					<div className='mb-2 max-w-1/2'>
						<p
							className='bg-gray-100 text-black py-2 px-3 rounded-lg inline-flex text-xs'
							dangerouslySetInnerHTML={{ __html: replaceWithBr() }}
						></p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='flex flex-row-reverse gap-4 mb-4'>
			<ChatAvatar name={getUserInitials(session?.user?.name)} />
			<div className='flex flex-col items-end'>
				<div className='mb-2 max-w-1/2'>
					<p className='bg-gray-100 text-black py-2 px-3 rounded-lg inline-flex text-xs'>
						{parsedMessage}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ChatMessage;
