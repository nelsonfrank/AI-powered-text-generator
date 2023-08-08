"use client";

import { useRef } from "react";
import { store } from "@/store";
import { getMessagesByUserIdAsync } from "@/store/features/messagesSlice";

function Preloader() {
	const userId = "12345";
	const loaded = useRef(false);
	if (!loaded.current) {
		store.dispatch(getMessagesByUserIdAsync(userId));
		loaded.current = true;
	}

	return null;
}

export default Preloader;
