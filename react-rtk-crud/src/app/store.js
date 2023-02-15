//redux-toolkit
import { configureStore } from "@reduxjs/toolkit";

//reducers
import taskReducer from "../features/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});
