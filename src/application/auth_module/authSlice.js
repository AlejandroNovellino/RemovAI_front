import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const initialState = {
	user: null,
	token: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addMatcher(
			apiSlice.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				state.token = payload.token;
				state.user = payload.user;
			}
		);
	},
});

// Selector for current user
export const selectCurrentUser = state => state.auth.user;

// Export the reducer
export default authSlice.reducer;
