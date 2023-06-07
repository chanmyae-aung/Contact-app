import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "  https://contact-app.mmsdev.site/api/v1",
  }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    getContact: builder.query({
      query: (token) => ({
        url: "/contact",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["contact"],
    }),
    createContact: builder.mutation({
      query: ({ token, data }) => ({
        url: "/contact",
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        body: data,
      }),
      invalidatesTags: ["contact"],
    }),
    deleteContact: builder.mutation({
      query: ({ id, token }) => ({
        url: `/contact/${id}`,
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["contact"],
    }),
    getSingleContact: builder.query({
      query: ({id, token}) => ({
        url: `/contact/${id}`,
        headers: {authorization : `Bearer ${token}`},
      }),
      providesTags: ['contact'],
    }),
    updateContact: builder.mutation({
      query: ({id, token}) => ({
        url: `/contact/${id}`,
        method: "PUT",
        headers: {authorization : `Bearer ${token}`}
      }),
      invalidatesTags: ["contact"]
    })
  }),
});

export const {
  useGetContactQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
  useGetSingleContactQuery
} = contactApi;
