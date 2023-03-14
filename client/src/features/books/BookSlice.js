import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const res = await axios.get("http://localhost:5001/api/books");
  //console.log(res.data)
  return res.data;
});
export const addBook = createAsyncThunk("items/addBook", async (book) => {
  const { title, author, price } = book;
  const res = await axios.post(
    "http://localhost:5001/api/books",
    {
      name: title,
      author,
      price,
    },
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  );
  return res.data;
});
export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (book_id) => {
    //console.log(book_id);
    const URL = `http://localhost:5001/api/books/${book_id}`;
    //console.log(URL);
    const res = await axios.delete(URL, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    console.log(res);
    return res.data;
  }
);

export const bookSlice = createSlice({
  name: "books",
  initialState: {
    isLoading: false,
    books: [],
    error: null,
  },
  reducers: {
    showBooks: (state) => state,
    updateBook: (state, action) => {
      const { id, name, author, price } = action.payload;
      const isBookExist = state.books.filter((book) => book.id === id);
      if (isBookExist) {
        isBookExist[0].name = name;
        isBookExist[0].author = author;
        isBookExist[0].price = price;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
      state.error = null;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.isLoading = false;
      state.books = [...state.books];
      state.error = action.payload;
    });
    builder.addCase(addBook.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) state.books.unshift(action.payload);
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.message === "book Deleted")
        state.books = state.books.filter(
          (item) => item._id !== action.payload.id
        );
    });
  },
});

export default bookSlice.reducer;
export const { showBooks, updateBook, booksLoading } = bookSlice.actions;
