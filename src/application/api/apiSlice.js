import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://localhost:7001/api/", // MockApi "https://662e73e9a7dda1fa378d0185.mockapi.io/api/v1/",
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
			}),
		}),
		// other endpoints
		// -- get welcome movies
		getWelcomeMovies: builder.query({
			query: _ => "Pelicula",
			transformResponse: response => {
				let welcomeMovies = [];
				let movies = response.body;
				let amountMovies = movies.length;
				// get
				for (const i of Array(5).keys()) {
					console.log(`🚀 ~ i:`, i);

					welcomeMovies.push(
						response[Math.floor(Math.random() * amountMovies.length)]
					);
				}

				return welcomeMovies;
			},
		}),
		// -- get movies
		getRecommendedMovies: builder.query({
			query: _ => "/movies",
		}),
		// -- like movies
		likeMovies: builder.mutation({
			queryFn: (likedMovies, api, extraOptions, baseQuery) => {
				// get the store to get the user id
				const state = api.getState();
				const userId = state.auth.id;
				// return the base query
				return baseQuery({
					url: `/Likes`,
					method: "POST",
					body: likedMovies.map(likedMovie => {
						return {
							id_usuario: userId,
							id_Pelicula: likedMovie.id_pelicula,
						};
					}),
				});
			},
		}),
	}),
});

export const {
	useGetUsersQuery,
	useLoginMutation,
	useSignInMutation,
	useGetWelcomeMoviesQuery,
	useGetRecommendedMoviesQuery,
	useLikeMoviesMutation,
} = apiSlice;
