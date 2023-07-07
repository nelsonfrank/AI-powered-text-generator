import ChatAvatar from "./chat-avatar";

interface ChatMessageProps {
	position: "left" | "right";
}

const ChatMessage = ({ position }: ChatMessageProps) => {
	if (position === "left") {
		return (
			<div className='flex gap-4 mb-4'>
				<ChatAvatar name='AI' />
				<div>
					<div className='mb-2 max-w-1/2'>
						<p className='bg-gray-100 text-black py-2 px-3 rounded-lg inline-flex text-xs'>
							Just ideas for next time
						</p>
					</div>
					<div className='mb-2 max-w-1/2'>
						<p className='bg-gray-100 text-black py-2 px-3 rounded-lg inline-flex text-xs'>
							Just ideas for next time
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='flex flex-row-reverse gap-4 mb-4'>
			<ChatAvatar name='ET' />
			<div className='flex flex-col items-end'>
				<div className='mb-2 max-w-1/2'>
					<p className='bg-gray-100 text-black py-2 px-3 rounded-lg inline-flex text-xs'>
						Just ideas for next time
					</p>
				</div>
				<div className='mb-2 max-w-1/2'>
					<p className='bg-gray-100 text-black py-2 px-3 rounded-lg inline-flex text-xs'>
						Just ideas for next time
					</p>
				</div>
			</div>
		</div>
	);
};

export default ChatMessage;
