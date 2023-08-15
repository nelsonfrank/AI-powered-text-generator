"use client";
import { RootState } from "@/store";
import ChatMessage from "./chat-message";
import { useSelector } from "react-redux";

const Chats = () => {
	const { messages } = useSelector((state: RootState) => state.messages);

	return (
		<div className='font-inter w-11/12 mx-auto mt-32 mb-32'>
			<div className='overflow-hidden'>
				{messages.map((message) => (
					<ChatMessage
						key={message.id}
						position={message.author === "AI" ? "left" : "right"}
						message={message.content}
					/>
				))}
			</div>
		</div>
	);
};

export default Chats;
