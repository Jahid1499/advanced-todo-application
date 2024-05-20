import { apiSlice } from "../api/apiSlice";

export const todosApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTodo: builder.query({
            query: () => "/todos"
        })

        // end points hear
    })
})