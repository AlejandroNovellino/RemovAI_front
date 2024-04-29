import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const initialState = {
	token: null,
	username: "",
	email: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addMatcher(
				apiSlice.endpoints.login.matchFulfilled,
				(state, { payload }) => {
					state.token = payload.token;
					state.username = payload.username;
					state.email = payload.email;
				}
			)
			.addMatcher(
				apiSlice.endpoints.signIn.matchFulfilled,
				(state, { payload }) => {
					state.token = payload.token;
					state.username = payload.username;
					state.email = payload.email;
				}
			);
	},
});

// Selector for current user
export const selectCurrentUser = state => state.auth.user;

// Export the reducer
export default authSlice.reducer;
