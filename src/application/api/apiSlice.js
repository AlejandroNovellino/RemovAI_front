import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://662e73e9a7dda1fa378d0185.mockapi.io/api/v1/",
	}),

	endpoints: builder => ({
		// all endpoints can go here or use the injectEndpoints()
		// see documentation for that
		// build.query() for get data
		// builder.mutation() sends updates to the server
		// -- get user query
		getUsers: builder.mutation({
			query: () => `/users`,
		}),
		// -- login user mutation
		login: builder.mutation({
			query: credentials => ({
				url: `/login`,
				method: "POST",
				body: credentials,
			}),
		}),
		// -- sign-in user mutation
		signIn: builder.mutation({
			query: credentials => ({
				url: `/login`,
				method: "POST",
				body: credentials,
			}),
		}),
		// other endpoints
		// -- get welcome movies
		getWelcomeMovies: builder.query({
			query: _ => "/movies",
		}),
		// -- get movies
		getRecommendedMovies: builder.query({
			query: _ => "/movies",
		}),
	}),
});

export const {
	useGetUsersQuery,
	useLoginMutation,
	useSignInMutation,
	useGetWelcomeMoviesQuery,
	useGetRecommendedMoviesQuery,
} = apiSlice;
