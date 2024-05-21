import { apiSlice } from "../api/apiSlice";
// type TodoTypes = {
//     text: string;
//     completed: boolean;
//     id: number;
//     color?: "green" | "red" | "yellow";
// }[];

export const todosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
    }),

    addTodos: builder.mutation({
      query: (data) => ({
        url: "/todos",
        method: "POST",
        body: data,
      }),

      // Pessimistically update start
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const todo = await queryFulfilled;

        if (todo?.data?.id) {
          console.log(todo); // show todo
          // update todo cache pessimistically start
          dispatch(
            apiSlice.util.updateQueryData("getTodos", undefined, (draft) => {
              console.log(JSON.stringify(draft));
              return draft;
            })
          );
          // update todo cache pessimistically end
        }
      },
    }),
    updateTodos: builder.mutation({
      query: ({ id, data }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(
        { id, data: { color, completed, text } },
        { queryFulfilled, dispatch }
      ) {
        console.log(id, color, completed, text);

        dispatch(
          apiSlice.util.updateQueryData("getTodos", undefined, (draft) => {
            console.log("TODOS ARRAY DRAFT", draft);
          })
        );

        const result = await queryFulfilled;
        console.log(result);
      },
    }),
    deleteTodos: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodosMutation,
  useUpdateTodosMutation,
  useDeleteTodosMutation,
} = todosApi;
