import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "http://localhost:8080/media";
const mediaAPIs= createApi({
  reducerPath: "mediaAPIs",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    uploadVideo: builder.mutation({
      query: (data) => ({
        url: `/upload-video`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useUploadVideoMutation } = mediaAPIs;
export { mediaAPIs };
