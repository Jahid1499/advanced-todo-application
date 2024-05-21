import { createSlice } from "@reduxjs/toolkit";

type TodosState = {
    text: string,
    completed: boolean,
    id: number,
    color: string,
}[]

const initialState: TodosState = [
    {
        text: "My todo",
        completed: true,
        id: 1000,
        color: "red",
    }
]

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state[0].text = action.payload.text
        },
    }
})

export const { userLoggedIn } = todosSlice.actions;
export default todosSlice.reducer;