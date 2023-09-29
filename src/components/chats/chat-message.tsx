import { useSession } from "next-auth/react";
import ChatAvatar from "./chat-avatar";
import { getUserInitials } from "@/utils";
import { useEffect, useState } from "react";
import Axios from "axios";

interface ChatMessageProps {
	position: "left" | "right";
	message: string | ReadableStream<Uint8Array>;
}

const ChatMessage = ({ position, message }: ChatMessageProps) => {
	const { data: session } = useSession();
	const [response, setResponse] = useState("");
	const [doneReading, setDoneReading] = useState(false);

	const user = session?.user;

	const parser = new DOMParser();

	function replaceWithBr() {
		return response?.replace(/\n/g, "<br />");
	}

	const saveResponseToDb = async (payload: {
		senderId: string;
		receiverId: string;
		content: string;
	}) => {
		await Axios.post("/api/prompt", {
			receiverId: payload.senderId,
			senderId: payload.receiverId,
			content: payload.content,
		});
	};
	const decodeMessage = async (
		data: ReadableStream<Uint8Array> | null | string
	) => {
		if (!data || typeof data === "string") return;
		const reader = data.getReader();
		const decoder = new TextDecoder();
		let done = false;

		while (!done) {
			const { value, done: doneReading } = await reader.read();
			done = doneReading;
			setDoneReading(doneReading);
			const chunkValue = decoder.decode(value);
			setResponse((prev) => prev + chunkValue);
		}
	};

	useEffect(() => {
		if (position === "left") {
			decodeMessage(message);
		}
	}, [message, position]);

	useEffect(() => {
		if (doneReading && user) {
			saveResponseToDb({
				receiverId: user.id,
				senderId: "64e0b4809458da2c53c88629",
				content: response,
			});
		}
	}, [doneReading, response, user]);

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
