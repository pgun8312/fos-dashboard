import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
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
  reducerPath: "adminApi",
  tagTypes: ["Products", "Orders", "Users"],
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    getProducts: builder.query({
      query: () => "products" /* endpoint */,
      providesTags: ["Products"],
    }),
    getProductById: builder.query({
      query: (productId) => `products/${productId}`,
      providesTags: ["Products"],
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
    getOrders: builder.query({
      query: () => `orders`,
      providesTags: ["Orders"],
    }),
    getOrderById: builder.query({
      query: (orderId) => `orders/${orderId}`,
      providesTags: ["Orders"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, updatedOrder }) => ({
        url: `orders/${orderId}`,
        method: "PATCH",
        body: updatedOrder,
      }),
      invalidatesTags: ["Orders"],
    }),
    CancelOrder: builder.mutation({
      query: (orderId) => ({
        url: `orders/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
    DeActivateUser: builder.mutation({
      query: (userId) => ({
        url: `users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useCancelOrderMutation,
  useDeActivateUserMutation,
} = adminApi;
