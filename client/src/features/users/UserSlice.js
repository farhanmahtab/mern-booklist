import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const signUp = createAsyncThunk("users/signUp", async (user) => {
  const signUp_URL = "http://localhost:5001/api/users/signUp";
  let res;
  try {
    res = await axios.post(signUp_URL, {
      name: user.name,
      email: user.email,
      password: user.password,
    });
    console.log(res.data);
    localStorage.setItem("token", "Bearer " + res.data.token);
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const logIn = createAsyncThunk("users/login", async (user) => {
  console.log(user);
  const login_URL = "http://localhost:5001/api/users/login";
  let res;
  try {
    res = await axios.post(login_URL, {
      email: user.email,
      password: user.password,
    });
  } catch (e) {
    console.log(e);
  }
  console.log(res.data);
  localStorage.setItem("token", "Bearer " + res.data.token);
  return res.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: localStorage.getItem("token") || "",
  },
  reducers: {
    logOut: (state) => {
      state.currentUser = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    });
  },
});

export const { logOut } = usersSlice.actions;
export default usersSlice.reducer;
