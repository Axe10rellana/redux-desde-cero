//redux-toolkit
import { createSlice } from "@reduxjs/toolkit";

//initialState
const initialState = [
  { id: "0", name: "Dude Lebowski" },
  { id: "1", name: "Neil Young" },
  { id: "2", name: "Dave Gray" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

//selector
export const selectAllUsers = (state) => state.users;

//reducers
export default usersSlice.reducer;
