//redux toolkit
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

//api
import { apiSlice } from "../api/apiSlice";

//entity adapter
const usersAdapter = createEntityAdapter();

//initialState
const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      transformResponse: (responseData) => {
        return usersAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "User", id: "LIST" },
        ...result.ids.map((id) => ({ type: "User", id })),
      ],
    }),
  }),
});

//usersSlice hooks
export const { useGetUsersQuery } = usersApiSlice;

//query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

//selector memoized
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data //normalized state object with ids and entities
);

//selectors
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);
