import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const COURSE_PURCHASE_API = "http://localhost:8080/purchase";
const dmn = import.meta.env.MODE === 'development' ? 'http://localhost:8080':""
const COURSE_PURCHASE_API = `${dmn}/purchase`;

export const purchaseAPIs = createApi({
  reducerPath: "purchaseAPIs",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PURCHASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (courseID) => ({
        url: "/checkout/create-checkout-session",
        method: "POST",
        body: { courseID },
      }),
    }),
    getCourseDetailWithStatus: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/detail-with-status`,
        method: "GET",
      }),
    }),
    getPurchasedCourses: builder.query({
      query: () => ({
        url: `/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useGetCourseDetailWithStatusQuery,
  useGetPurchasedCoursesQuery,
} = purchaseAPIs;