import { apiSlice } from "../api/apiSlice";
// type TodoTypes = {
//     text: string;
//     completed: boolean;
//     id: number;
//     color?: "green" | "red" | "yellow";
// }[];

type TodoTypes = {
  text: string;
  completed: boolean;
  id: number;
  color?: "green" | "red" | "yellow";
}


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
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;

        if (data?.id) {
          // dispatch(
          //   todosApi.endpoints.updateTodos.initiate({
          //     id: todo.data.id,
          //     data: {
          //       text: "this is update text",
          //       color: "green",
          //       completed: true
          //     }
          //   })
          // )
          dispatch(
            todosApi.util.updateQueryData("getTodos", {}, (draft) => {
              draft.push(data)
            })
          );
        }
      },
    }),

    updateTodos: builder.mutation({
      query: ({ id, data }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted({ id, data: { color, completed, text } }, { queryFulfilled, dispatch }) {
        const updateDraft = dispatch(
          todosApi.util.updateQueryData("getTodos", {}, (draft) => {
            const draftTodos = draft.find(
              (todo: TodoTypes) => todo.id == id
            );
            draftTodos.id = id;
            draftTodos.completed = completed;
            draftTodos.text = text;
            draftTodos.color = color;
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          updateDraft.undo();
        }
      },
    }),
    deleteTodos: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        console.log(arg);
        const updateDraft = dispatch(
          todosApi.util.updateQueryData("getTodos", {}, (draft) => {
            const index = draft.findIndex(
              (todo: TodoTypes) => todo.id == arg
            );

            draft.splice(index, 1)
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          updateDraft.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodosMutation,
  useUpdateTodosMutation,
  useDeleteTodosMutation,
} = todosApi;
