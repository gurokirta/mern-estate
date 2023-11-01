import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: state => {
      state.isLoading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    userUpdateStart: state => {
      state.isLoading = true;
    },
    userUpdateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    userUpdateFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    userDeleteStart: state => {
      state.isLoading = true;
    },
    userDeleteSuccess: state => {
      state.currentUser = null;
      state.isLoading = false;
      state.error = null;
    },
    userDeleteFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    userSignOutStart: state => {
      state.isLoading = true;
    },
    userSignOutSuccess: state => {
      state.currentUser = null;
      state.isLoading = false;
      state.error = null;
    },
    userSignOutFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  userUpdateFailure,
  userUpdateStart,
  userUpdateSuccess,
  userDeleteFailure,
  userDeleteStart,
  userDeleteSuccess,
  userSignOutFailure,
  userSignOutStart,
  userSignOutSuccess,
} = userSlice.actions;
export default userSlice.reducer;
