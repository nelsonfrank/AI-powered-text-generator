"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
// Components
import { Send } from "@/components/icons/icons";
import { Input } from "@/components/ui/input";
import { AppDispatch } from "@/store";
import { sendMessageAsync } from "@/store/features/messagesSlice";
import { useSession } from "next-auth/react";

const ChatInput = () => {
	const [prompt, setPromt] = useState("");
	const [loading, setLoading] = useState(false);
	const [input, setInput] = useState("");
	const [response, setResponse] = useState<String>("");
	const dispatch = useDispatch<AppDispatch>();

	const { data: session } = useSession();

	const user = session?.user;

	const handleKeyPress = (e: any) => {
		if (e.key === "Enter") {
			handleSubmit(e);
		}
	};

	const generateResponse = async (
		e: React.MouseEvent<HTMLButtonElement>,
		prompt: string
	) => {
		e.preventDefault();
		setResponse("");
		setLoading(true);

		const response = await fetch("/api/messages", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				prompt,
			}),
		});

		if (!response.ok) {
			throw new Error(response.statusText);
		}

		// This data is a ReadableStream
		const data = response.body;
		if (!data) {
			return;
		}

		const reader = data.getReader();
		const decoder = new TextDecoder();
		let done = false;

		while (!done) {
			const { value, done: doneReading } = await reader.read();
			done = doneReading;
			const chunkValue = decoder.decode(value);
			setResponse((prev) => prev + chunkValue);
		}
		setLoading(false);
	};
	const handleSubmit = (e: any) => {
		e.preventDefault();

		if (!user) return;

		dispatch(
			sendMessageAsync({
				receiverId: "64e0b4809458da2c53c88629",
				senderId: user.id,
				content: prompt,
			})
		);
		// generateResponse(e, message);
		setPromt("");
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPromt(e.target.value);
	};

	return (
		<div>
			<div className='fixed bottom-0 left-0 right-0 px-2 bg-white'>
				<div className=' input-container'>
					<Input
						placeholder='Type your prompt heres'
						value={prompt}
						onChange={handleInputChange}
						onKeyUp={handleKeyPress}
					/>
					<button onClick={handleSubmit}>
						<Send />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChatInput;
