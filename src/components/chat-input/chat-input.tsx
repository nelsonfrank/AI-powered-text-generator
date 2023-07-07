import { useState } from "react";

// Components
import { Send } from "@/components/icons/icons";
import { Input } from "@/components/ui/input";

const ChatInput = () => {
	const [prompt, setPromt] = useState("");

	const handleKeyPress = (e: any) => {
		if (e.key === "Enter") {
			handleSubmit(e);
		}
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		// Perform form submission logic here
		console.log("Form submitted with value:", prompt);
		// Reset the form after submission if needed
		setPromt("");
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPromt(e.target.value);
	};

	return (
		<div className='fixed bottom-2 left-0 right-0 px-2 '>
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
	);
};

export default ChatInput;
