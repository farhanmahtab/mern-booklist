import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/books/BookSlice";
import usersReducer from "../features/users/UserSlice"

const store = configureStore({
  reducer: {
    booksReducer: booksReducer,
    usersReducer: usersReducer
  },
});

export default store;