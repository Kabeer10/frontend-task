import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = "https://reqres.in/api/users";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (page) => `?page=${page}`,
    }),
  }),
});

export const singleUserApi = createApi({
  reducerPath: "singleUserApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (id) => `/${id}`,
    }),
  }),
});

const initialState = {
  loading: true,
  page: 1,
  totalPages: 1,
  users: [],
  selectedUserId: null,
};

export const usersSlice = createSlice({
  name: "usersData",
  initialState,
  reducers: {
    addUsers: (state, { payload }) => {
      const { users, totalPages } = payload;
      state.users = [...state.users, ...users];
      state.totalPages = totalPages;
      state.loading = false;
    },
    nextPage: (state) => {
      console.log(state.page);
      state.page += 1;
    },
    setId: (state, { payload }) => {
      state.selectedUserId = payload;
    },
  },
});

export const { nextPage, addUsers, setId } = usersSlice.actions;
export const { useGetUsersQuery } = usersApi;
export const { useGetUsersQuery: useGetSingleUsersQuery } = singleUserApi;
export default usersSlice.reducer;
