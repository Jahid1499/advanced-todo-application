import { apiSlice } from "../api/apiSlice";

export const filterApi = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getFilters: builder.query({
            query: () => "/filters"
        }),

        updateStatus: builder.mutation({
            query: ({ id, data }) => ({
                url: `/filters/${id}`,
                method: 'PATCH',
                body: data
            }),

            async onQueryStarted({ data }, { queryFulfilled, dispatch }) {
                const updateDraft = dispatch(
                    filterApi.util.updateQueryData("getFilters", {}, (draft) => {
                        draft[0].status = data.status
                    })
                );

                try {
                    await queryFulfilled;
                } catch (error) {
                    updateDraft.undo();
                }
            },
        }),

        updateColorStatus: builder.mutation({
            query: (data) => ({
                url: `/filters/1`,
                method: 'PATCH',
                body: data
            })
            // {data: status: "Incomplete"
            // id: 1}

            // 0 : {
            //     colors:[]
            //     id:1
            //     status:"All"
            // }
            // Optimistic update start
            // Optimistic update start
        }),
    })
})

export const { useGetFiltersQuery, useUpdateStatusMutation, useUpdateColorStatusMutation } = filterApi;