import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { MoviesResponse } from "../types";

const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.aparat.com/fa/v1/",
  }),
  endpoints: (builder) => ({
    getMovies: builder.query<MoviesResponse, void>({
      query: () => "video/video/mostViewedVideos",
    }),
  }),
});

export default movieApi;
export const { useGetMoviesQuery } = movieApi;
