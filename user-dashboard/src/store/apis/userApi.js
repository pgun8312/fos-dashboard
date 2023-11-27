import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      //Get the token from the session or authUser global state
      const token =
        sessionStorage.getItem("token") || getState().authUser?.token;

      //if token exists, include it in the headers
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  reducerPath: "userApi",
  tagTypes: ["Products", "Orders", "Users"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products" /* endpoint */,
      providesTags: ["Products"],
    }),
    getProductById: builder.query({
      query: (productId) => `products/${productId}`,
      providesTags: ["Products"],
    }),
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: `orders`,
        method: "POST",
        body: newOrder,
      }),
      invalidatesTags: ["Orders"],
    }),
    getUserOrder: builder.query({
      query: (userId) => `orders/user/${userId}`,
      providesTags: ["Orders"],
    }),
    getOrderById: builder.query({
      query: (orderId) => `orders/${orderId}`,
      providesTags: ["Orders"],
    }),
    getUserDetails: builder.query({
      query: (userId) => `users/${userId}`,
      providesTags: ["Users"],
    }),
    updateUserAccountDetails: builder.mutation({
      query: ({ updatedUser, userId }) => ({
        url: `users/${userId}`,
        method: "PUT",
        body: updatedUser,
      }),
      invalidatesTags: ["Users"],
    }),
    creaeteUserProfileDetails: builder.mutation({
      query: (newUserProfile) => ({
        url: `users/user-profile`,
        method: "POST",
        body: newUserProfile,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUserProfileDetails: builder.mutation({
      query: ({ updatedUserProfile, userId }) => ({
        url: `users/user-profile/${userId}`,
        method: "PUT",
        body: updatedUserProfile,
      }),
      invalidatesTags: ["Users"],
    }),
    /* This endpoint should not be here do the refactoring */
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ productId, updatedProduct }) => ({
        url: `products/${productId}`,
        method: "PUT",
        body: updatedProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetUserOrderQuery,
  useGetOrderByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateOrderMutation,
  useGetUserDetailsQuery,
  useUpdateUserAccountDetailsMutation,
  useUpdateUserProfileDetailsMutation,
  useCreaeteUserProfileDetailsMutation,
} = userApi;
