//redux toolkit
import { createSlice } from "@reduxjs/toolkit";

//initialState
const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

//selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;

//actions
export const { setCredentials, logOut } = authSlice.actions;

//reducers
export default authSlice.reducer;
