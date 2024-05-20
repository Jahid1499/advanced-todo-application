import { apiSlice } from "../api/apiSlice";

export const filterApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFilters: builder.query({
            query: () => "/filters"
        }),
    })
})

export const { useGetFiltersQuery } = filterApi;