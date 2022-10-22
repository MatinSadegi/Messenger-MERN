import { createSlice, current } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "chat",
  initialState: {
    receivedMessages: [],
  },
  reducers: {
    setReceivedMessages: (state, action) => {
      if (!current(state.receivedMessages).includes(action.payload)) {
        state.receivedMessages = [...state.receivedMessages, action.payload];
        console.log(action.payload)

      }
    },
  },
});

export const { setReceivedMessages } = messageSlice.actions;
export default messageSlice.reducer;
