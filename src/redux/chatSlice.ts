import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../types/Message";

interface ChatState {
  messages: Message[];
  page: number;
}

const initialState: ChatState = {
  messages: [],
  page: 0,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = [...action.payload, ...state.messages];
    },
    sendMessage: (state, action: PayloadAction<Message>) => {
      state.messages = [...state.messages, action.payload];
    },
    incrementPage: (state) => {
      state.page += 1;
    },
  },
});

export const { addMessages, sendMessage, incrementPage } = chatSlice.actions;

export default chatSlice.reducer;
