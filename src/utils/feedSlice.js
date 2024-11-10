import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload
        },
        removeFeed: (state, action) => {
            const newArray = state.filter(user => user._id !== action.payload);
            return newArray;
        },
        removeAllFeed: (state, action) => null
    }
})
export const { addFeed, removeFeed, removeAllFeed } = feedSlice.actions;
export default feedSlice.reducer;