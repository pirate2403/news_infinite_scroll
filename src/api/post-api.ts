import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PostsResponse, PostsResponsePayload } from "./interfaces";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getPosts: builder.query<PostsResponse, PostsResponsePayload>({
      query: ({ limit = 10, skip = 0 }) => `posts?limit=${limit}&skip=${skip}`,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      forceRefetch: ({ currentArg: c, previousArg: p }) => c?.skip !== p?.skip,
      merge: (currentCache, newItems) => {
        currentCache.posts.push(...newItems.posts);
      },
    }),
  }),
});
