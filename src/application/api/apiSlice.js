import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { store } from "../state/store";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
	prepareHeaders: (headers, { getState }) => {
		// By default, if we have a token in the store, let's use that for authenticated requests
		const token = store.auth.token;
		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}
		return headers;
	},
	endpoints: build => ({
		// all endpoints can go here or use the injectEndpoints()
		// see documentation for that
		// build.query() for get data
		// builder.mutation() sends updates to the server
		// -- get user query
		getUsers: build.mutation({
			query: () => `/users`,
		}),
		// -- login user mutation
		login: build.mutation({
			query: credentials => ({
				url: ``,
				method: "POST",
				body: credentials,
			}),
		}),
		// -- login user mutation
		signIn: build.mutation({
			query: credentials => ({
				url: ``,
				method: "POST",
				body: credentials,
			}),
		}),
		// other endpoints
	}),
});

export const { useGetUsersQuery, useLoginMutation, useSignInMutation } =
	apiSlice;
