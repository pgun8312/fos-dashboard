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
  tagTypes: ["Product", "Orders", "Users"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products" /* endpoint */,
      providesTags: (result) => [{ type: "Product", id: "List" }],
    }),
    getProductById: builder.query({
      query: (productId) => `products/${productId}`,
      providesTags: (result, error, productId) => [
        { type: "Product", id: productId },
      ],
    }),
    /* This endpoint should not be here do the refactoring */
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: [{ type: "Product", id: "List" }],
    }),
    updateProduct: builder.mutation({
      query: ({ productId, updatedProduct }) => ({
        url: `products/${productId}`,
        method: "PUT",
        body: updatedProduct,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Product", id: productId },
      ],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, productId) => [
        { type: "Product", id: productId },
      ],
    }),
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: `orders`,
        method: "POST",
        body: newOrder,
      }),
      invalidatesTags: [{ type: "Users", id: "List" }],
    }),
    getUserDetails: builder.query({
      query: (userId) => `users/${userId}`,
      providesTags: (result, error, userId) => [{ type: "User", id: userId }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateOrderMutation,
  useGetUserDetailsQuery,
} = userApi;
