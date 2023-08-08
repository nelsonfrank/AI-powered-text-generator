import { configureStore } from "@reduxjs/toolkit";
import messageSlice from './features/messagesSlice'

export const store = configureStore({
    reducer: {
        messages: messageSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;