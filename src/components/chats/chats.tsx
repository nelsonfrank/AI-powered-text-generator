import ChatMessage from "./chat-message";

const Chats = () => {
	return (
		<div className='font-inter w-11/12 mx-auto mt-32 mb-32'>
			<div className='overflow-hidden'>
				<ChatMessage position='left' />
				<ChatMessage position='right' />
			</div>
		</div>
	);
};

export default Chats;
