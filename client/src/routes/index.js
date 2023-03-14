import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import Home from "../pages/Home";
import Error from "../pages/Error";
import BooksView from "../features/books/BooksView";
import AddBook from "../features/books/AddBook";
import EditBook from "../features/books/EditBook";
import Navbar from "../layouts/Navbar";
import LogInPage from "../pages/LogIn";
import SignUpPage from "../pages/SignUp";
import { useSelector } from "react-redux";
//import Footer from "../layouts/Footer";

const Index = () => {
  const { currentUser } = useSelector((state) => state.usersReducer);
  console.dir(currentUser);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<BooksView />} />
        <Route path="/show-books" element={<BooksView />} />
        <Route path="/add-books" element={<AddBook />} />
        <Route path="/edit-books" element={<EditBook />} />
        <Route path="/" element={<BooksView />} />
        <Route path="/addItem" element={<AddBook />} />

        {!currentUser ? (
          <>
            <Route path="/login" element={<LogInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </>
        ) : (
          <>
            <Route path="/addItem" element={<AddBook />} />
          </>
        )}
        <Route path="*" element={<Error />} />
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  );
};

export default Index;
