import { createSlice } from "@reduxjs/toolkit";


const initialState = {}

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {

    }
})

export const { } = todosSlice.actions;
export default todosSlice.reducer;