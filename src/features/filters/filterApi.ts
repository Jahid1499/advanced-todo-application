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
            })
        }),

        updateColorStatus: builder.mutation({
            query: (data) => ({
                url: `/filters/1`,
                method: 'PATCH',
                body: data
            })
        }),
    })
})

export const { useGetFiltersQuery, useUpdateStatusMutation, useUpdateColorStatusMutation } = filterApi;