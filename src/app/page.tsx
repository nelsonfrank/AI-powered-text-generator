"use client";
import ChatInput from "@/components/chat-input";
import Header from "@/components/header";

export default function Home() {
	return (
		<main>
			<Header />
			<div className='h-1 w-full border-b-2 border-gray-300'></div>
			<div></div>
			<ChatInput />
		</main>
	);
}
