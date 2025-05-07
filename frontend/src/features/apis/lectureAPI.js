import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "http://localhost:8080/course";

const lectureAPIs = createApi({
  reducerPath: "lectureAPIs",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    credentials: "include",
  }),
  endpoints:(builder)=>({
    createLecture:builder.mutation({
        query:({ courseID, lectureTitle })=>({
            url:`/${courseID}/create-lecture`,
            method:"POST",
            body:{lectureTitle}
        })
    }),
    getAllLectures:builder.query({
        query:(data)=>({
            url:`/${data}/get-all-lectures`,
            method:"GET",
        })
    })
  })
});
export const { useCreateLectureMutation ,useGetAllLecturesQuery } = lectureAPIs;
export {lectureAPIs}
