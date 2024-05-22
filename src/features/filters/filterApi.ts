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
            }),
            async onQueryStarted({ colors }, { queryFulfilled, dispatch }) {

                const updateDraft = dispatch(
                    filterApi.util.updateQueryData("getFilters", {}, (draft) => {
                        draft[0].colors = colors
                    })
                );

                try {
                    await queryFulfilled;
                } catch (error) {
                    updateDraft.undo();
                }
            },
        }),
    })
})

export const { useGetFiltersQuery, useUpdateStatusMutation, useUpdateColorStatusMutation } = filterApi;