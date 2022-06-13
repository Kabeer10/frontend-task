import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import { usersApi, singleUserApi } from "./usersSlice";
export const store = configureStore({
  reducer: {
    usersData: usersReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [singleUserApi.reducerPath]: singleUserApi.reducer,
  },
  devTools: true,
});
