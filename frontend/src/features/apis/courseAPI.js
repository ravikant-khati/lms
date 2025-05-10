import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "http://localhost:8080/course";

const courseAPIs = createApi({
  reducerPath: "courseAPIs",
  tagTypes: ["REFETCH_CREATOR_COURSE"],
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (inputData) => ({
        url: "create-course",
        method: "POST",
        body: inputData,
      }),
      invalidatesTags: ["REFETCH_CREATOR_COURSE"],
    }),
    getAllCoursesForAdmin: builder.query({
      query: () => ({
        url: "all-courses",
        method: "GET",
      }),
      providesTags: ["REFETCH_CREATOR_COURSE"],
    }),
    editCourse: builder.mutation({
      query: (inputData) => ({
        url: `/edit/${inputData.courseID}`,
        method: "PUT",
        body: inputData.formData,
      }),
      invalidatesTags: ["REFETCH_CREATOR_COURSE"],
    }),
    getCourse: builder.query({
      query: (id) => ({
        url: `/get-course/${id}`,
        method: "GET",
      }),
    }),
    togglePublishUnpublish: builder.mutation({
      query: (id) => ({
        url: `/${id}/toggle-publish`,
        method: "PATCH",
      }),
      invalidatesTags:['REFETCH_CREATOR_COURSE']
    }),
  }),
});
export const {
  useCreateCourseMutation,
  useGetAllCoursesForAdminQuery,
  useEditCourseMutation,
  useGetCourseQuery,
  useTogglePublishUnpublishMutation
} = courseAPIs;
export { courseAPIs };
