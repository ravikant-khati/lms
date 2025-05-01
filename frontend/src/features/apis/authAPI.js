import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../authSlice";

const baseURL = "http://localhost:8080/user/";

const authAPIs = createApi({
  reducerPath: "authAPIs",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData,
      }),
    }),
    loginUser: builder.mutation({
      query: (inputData) => ({ url: "login", method: "POST", body: inputData }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
            const result = await queryFulfilled;
            dispatch(userLoggedIn({user:result.data.user}))
        } catch (error) {
            console.log(error);
        }
      },
    }),
  }),
});

export const {useRegisterUserMutation , useLoginUserMutation} = authAPIs;
export {authAPIs}
