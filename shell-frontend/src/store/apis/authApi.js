import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/v1/" }),
  reducerPath:
    "authApi" /* the reducerPath is a unique string identifier used to store the slice of state managed by an API in the Redux store */,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body) => ({
        url: "auth/signUp",
        method: "POST",
        body: body,
      }),
      invalidatesTags: [
        "Auth",
      ] /* use tags to invalidate cached data when certain actions are performed */,
      /* When the signUp query is executed successfully, it invalidates any cached data associated with the "Auth" tag */
    }),
    signIn: builder.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
    confirmSignUp: builder.mutation({
      query: (body) => ({
        url: "auth/confirm-signUp",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
    resendConfirmationCode: builder.mutation({
      query: (body) => ({
        url: "auth/resend-confirmation-code",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useConfirmSignUpMutation,
  useResendConfirmationCodeMutation,
} = authApi;
