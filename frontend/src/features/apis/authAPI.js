import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";

// const baseURL = "http://localhost:8080/user";
const dmn = import.meta.env.MODE === 'development' ? 'http://localhost:8080':""
const baseURL = `${dmn}/user`;

const authAPIs = createApi({
  reducerPath: "authAPIs",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    credentials: "include",
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
          // console.log(result)
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    loadUser: builder.query({
      query: () => ({
        url: "profile",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // console.log("quey result" , result)
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateUser:builder.mutation({
      query:(data)=>({
        url:"profile-update",
        method:"PUT",
        body:data
      })
    }),
    logoutUser:builder.mutation({
      query:()=>({
        url:"logout",
        method:"GET"
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // console.log("quey result" , result)
          dispatch(userLoggedOut());
        } catch (error) {
          console.log(error);
        }
      }
    })
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLoadUserQuery,
  useUpdateUserMutation,
  useLogoutUserMutation
} = authAPIs;
export { authAPIs };
