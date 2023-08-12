import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Message } from "@/types";
import Axios from "axios";

export interface MessagesState {
    isLoading: boolean;
    messages: Message[];
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
    async (payload: {
        author: string,
        content: string
    }, thunkAPI) => {
        try {
            const response = await Axios.post("/api/messages", payload)

            return response;
        } catch (error) {

            return thunkAPI.rejectWithValue("Fail to send message");
        }

    }
);

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {

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
            })
            .addCase(sendMessageAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
    },
});

export default messagesSlice.reducer;