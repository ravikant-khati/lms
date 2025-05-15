import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "http://localhost:8080/progress";

const progressAPIs = createApi({
  reducerPath: "progressAPIs",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCourseProgress: builder.query({
      query: (courseID) => ({
        url: `/${courseID}`,
        method: "GET",
      }),
    }),
    updateCourseProgress:builder.mutation({
        query:(body)=>({
            url:`/update-course-progress/${body.courseID}`,
            method:"POST",
            body:body
        })
    })
  }),
});
export const {useGetCourseProgressQuery , useUpdateCourseProgressMutation} = progressAPIs;
export { progressAPIs };
