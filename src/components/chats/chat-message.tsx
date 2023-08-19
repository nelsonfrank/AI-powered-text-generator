import { useSession } from "next-auth/react";
import ChatAvatar from "./chat-avatar";
import { getUserInitials } from "@/utils";

interface ChatMessageProps {
	position: "left" | "right";
	message: string;
}

const ChatMessage = ({ position, message }: ChatMessageProps) => {
	const { data: session } = useSession();
	const parser = new DOMParser();
	function replaceWithBr() {
		return message.replace(/\n/g, "<br />");
	}

	const parsedMessage = parser.parseFromString(message, "text/html").body
		.textContent;

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
