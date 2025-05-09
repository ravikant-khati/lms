import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "http://localhost:8080/course";

const lectureAPIs = createApi({
  reducerPath: "lectureAPIs",
  tagTypes:['REFETCH_LECTURES'],
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createLecture: builder.mutation({
      query: ({ courseID, lectureTitle }) => ({
        url: `/${courseID}/create-lecture`,
        method: "POST",
        body: { lectureTitle },
      }),
    }),
    getAllLectures: builder.query({
      query: (data) => ({
        url: `/${data}/get-all-lectures`,
        method: "GET",
      }),
      providesTags:['REFETCH_LECTURES']
    }),
    getLecture:builder.query({
      query:(lectureId)=>({
        url:`/get-lecture/${lectureId}`,
        method:'GET'
      })
    }),
    updateLecture: builder.mutation({
      query: ({
        courseID,
        lectureID,
        lectureTitle,
        lectureVideoInfo,
        isPreviewFree,
      }) => ({
        url:`/${courseID}/update-lecture/${lectureID}`,
        method:"PUT",
        body:{lectureTitle , lectureVideoInfo , isPreviewFree}
      }),
      invalidatesTags:['REFETCH_LECTURES']
    }),
    deleteLecture:builder.mutation({
      query:({courseID , lectureID})=>({
        url:`/${courseID}/delete-lecture/${lectureID}`,
        method:"DELETE"
      }),
      invalidatesTags:["REFETCH_LECTURES"]
    })
  }),
});
export const {
  useCreateLectureMutation,
  useGetAllLecturesQuery,
  useUpdateLectureMutation,
  useDeleteLectureMutation,
  useGetLectureQuery
} = lectureAPIs;
export { lectureAPIs };
