import { apiSlice } from "../api/apiSlice";

export const todosApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTodos: builder.query({
            query: () => "/todos"
        }),
        addTodos: builder.mutation({
            query: (data) => ({
                url: '/todos',
                method: 'POST',
                body: data
            })
        }),
        updateTodos: builder.mutation({
            query: ({ id, data }) => ({
                url: `/todos/${id}`,
                method: 'PATCH',
                body: data
            })
        }),
        deleteTodos: builder.mutation({
            query: (id) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
            })
        }),
    })
})

export const { useGetTodosQuery, useAddTodosMutation, useUpdateTodosMutation, useDeleteTodosMutation } = todosApi;