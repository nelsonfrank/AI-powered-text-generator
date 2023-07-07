import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChatAvatarProps {
	name: string;
}

const ChatAvatar = ({ name }: ChatAvatarProps) => {
	return (
		<Avatar className='rounded-xl'>
			<AvatarFallback className='rounded-xl bg-primary text-white font-bold'>
				{name}
			</AvatarFallback>
		</Avatar>
	);
};

export default ChatAvatar;
