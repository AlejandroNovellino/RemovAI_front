import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const initialState = {
	token: null,
	id: "",
	email: "",
	username: "",
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
					console.log(`🚀 ~ payload:`, payload);
					let result = payload.result;
					state.token = result.token;
					state.id = result.usuario.id;
					state.email = result.usuario.email;
					state.username = result.usuario.userName;
				}
			)
			.addMatcher(
				apiSlice.endpoints.signIn.matchFulfilled,
				(state, { payload }) => {
					console.log(`🚀 ~ payload:`, payload);
					let result = payload.result;
					state.token = result.token;
					state.id = result.usuario.id;
					state.email = result.usuario.email;
					state.username = result.usuario.userName;
				}
			);
	},
});

// Selector for current user
export const selectCurrentUser = state => state.auth.user;

// Export the reducer
export default authSlice.reducer;
