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
    getAllPublishedCourses: builder.query({
      query: () => ({
        url: "/get-published-courses",
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
    getCoursesByQuery:builder.query({
      query:({searchQuery , selectedCategories ,sortByPrice})=>{

        let queryString = `/query?query=${encodeURIComponent(searchQuery)}`

        if(selectedCategories && selectedCategories.length > 0 ){
          const categoriesString = selectedCategories.map(encodeURIComponent).join(',')
          queryString += `&category=${categoriesString}`
        }
        if(sortByPrice){
          queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`
        }
        return {
          url:queryString,
          method:"GET",
        }
      }
    })
  }),
});
export const {
  useCreateCourseMutation,
  useGetAllCoursesForAdminQuery,
  useEditCourseMutation,
  useGetCourseQuery,
  useTogglePublishUnpublishMutation,
  useGetAllPublishedCoursesQuery,
  useGetCoursesByQueryQuery
} = courseAPIs;
export { courseAPIs };
