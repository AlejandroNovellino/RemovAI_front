import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000/", // MockApi "https://662e73e9a7dda1fa378d0185.mockapi.io/api/v1/",
	}),

	endpoints: builder => ({
		// -- login user mutation
		login: builder.mutation({
			query: credentials => ({
				url: `usuarios/login`,
				method: "POST",
				body: credentials,
			}),
		}),
		// -- sign-in user mutation
		signIn: builder.mutation({
			query: credentials => ({
				url: `usuarios/registro`,
				method: "POST",
				body: credentials,
				headers: {
					"Access-Control-Allow-Origin": "https://localhost:3000",
				},
			}),
		}),
		// delete background api
		// -- get movies
		deleteBackground: builder.mutation({
			query: video => ({
				//url: `eliminar-fondo`,
				url: `delete-background`,
				method: "POST",
				body: {
					input: video,
				},
				headers: {
					"Access-Control-Allow-Origin": "https://localhost:3000",
				},
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useSignInMutation,
	useDeleteBackgroundMutation,
} = apiSlice;
