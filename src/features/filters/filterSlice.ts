import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: undefined,
    user: undefined,
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        },
    }
})

export const { userLoggedIn } = filterSlice.actions;
export default filterSlice.reducer;