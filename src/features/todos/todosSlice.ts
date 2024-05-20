import { createSlice } from "@reduxjs/toolkit";

type TodosState = {
    text: string,
    completed: boolean,
    id: number,
    color: string,
}[]

const initialState: TodosState = []

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {

    }
})

export const { } = todosSlice.actions;
export default todosSlice.reducer;