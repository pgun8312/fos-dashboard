import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/v1/" }),
  reducerPath: "productApi",
  tagTypes: ["Product"],
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
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
