"use client";
import ChatInput from "@/components/chat-input";
import Chats from "@/components/chats";
import Header from "@/components/header";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
	const router = useRouter();

	const { data: session, status } = useSession();

	if (!session && typeof window !== "undefined") {
		router.push("/auth/signin");
		return null;
	}

	return (
		<main>
			<Header />
			<Chats />
			<ChatInput />
		</main>
	);
}
