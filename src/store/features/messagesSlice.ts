import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Message } from "@/types";
import Axios from "axios";
import { ParsedEvent, ReconnectInterval, createParser } from "eventsource-parser";

export interface MessagesState {
    isLoading: boolean;
    messages: any[];
    error?: string
}

const initialState: MessagesState = {
    isLoading: false,
    messages: [],
};

function dummyAPICall(delay: number): Promise<any[]> {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve([]);
        }, delay);
    });
}


export const getMessagesByUserIdAsync = createAsyncThunk(
    "messages/getMessagesByUserAsync",
    async (userId: string, thunkAPI) => {
        try {
            const response = await dummyAPICall(2000)

            return response;
        } catch (error) {

            return thunkAPI.rejectWithValue("Fail to fetch messages");
        }

    }
);

export const sendMessageAsync = createAsyncThunk(
    "messages/sendMessageAsync",
    async (payload: Message, thunkAPI) => {
        try {
            const response = await Axios.post("/api/prompt", payload)

            if (!response.data) {
                throw new Error(response.statusText);
            }

            const data = response.data;
            if (!data) {
                return;
            }

            thunkAPI.dispatch(getMessageResponseAsync({
                senderId: payload.senderId,
                receiverId: payload.receiverId,
                content: payload.content
            }))

            return {
                sent: data,
            };
        } catch (error) {

            return thunkAPI.rejectWithValue("Fail to send message");
        }

    }
);

export const getMessageResponseAsync = createAsyncThunk(
    "messages/getMessageResponseAsync",
    async (payload: Message, thunkAPI) => {
        try {


            const response = await fetch("/api/ai-response", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            // This data is a ReadableStream
            const data = response.body;
            if (!data) {
                return;
            }





            // const dbResponse = await Axios.post("/api/prompt", {
            //     receiverId: payload.senderId,
            //     senderId: payload.receiverId,
            //     content: data,
            // })

            // if (!dbResponse.data) {
            //     throw new Error(response.statusText);
            // }

            // const newMessage = dbResponse.data

            return {
                response: data

            };
        } catch (error) {

            return thunkAPI.rejectWithValue("Fail to send message");
        }

    }
);

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        sendMessage(state, action) {
            state.messages = [...state.messages, action.payload]
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getMessagesByUserIdAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMessagesByUserIdAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.messages = action.payload;
            })
            .addCase(getMessagesByUserIdAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(sendMessageAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendMessageAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload) {
                    state.messages = [...state.messages, action.payload]
                }
            })
            .addCase(sendMessageAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(getMessageResponseAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMessageResponseAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload) {
                    state.messages = [...state.messages, action.payload]
                }
            })
            .addCase(getMessageResponseAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
    },
});

const { sendMessage } = messagesSlice.actions
export { sendMessage }
export default messagesSlice.reducer;