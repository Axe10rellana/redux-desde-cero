//redux-toolkit
import { configureStore } from "@reduxjs/toolkit";

//reducers
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
