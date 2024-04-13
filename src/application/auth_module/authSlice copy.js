import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const authAdapter = createEntityAdapter();

const initialState = authAdapter.getInitialState({
	status: "idle",
	error: null,
});

// If you are not using async thunks you can use the standalone `createSlice`.
const authSlice = createSlice({
	name: "auth",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		userLoggedIn(state, action) {
			// payload have to be unpacked
			// const { id, title, content } = action.payload
			// with the adapter you can have the element in the slice as
			//const existingPost = state.entities[id]
		},
	},
});

// Action creators are generated for each case reducer function.
export const { decrement, increment, incrementByAmount, incrementAsync } =
	authSlice.actions;

// Selectors
export const selectUser = state => state.auth.user;
// Export the customized selectors for this adapter using `getSelectors`
export const {
	selectAll: selectAllPosts,
	selectById: selectAuthById,
	selectIds: selectPostIds,
	// Pass in a selector that returns the posts slice of state
} = authAdapter.getSelectors(state => state.auth);

export const selectPostById = (state, postId) =>
	state.posts.find(post => post.id === postId);

// Export the reducer
export default authSlice.reducer;
