import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { deleteBook, fetchBooks } from "./BookSlice";
import { logOut } from "../users/UserSlice";

const BooksView = () => {
  const books = useSelector((state) => state.booksReducer.books);
  const { currentUser } = useSelector((state) => state.usersReducer);
  //console.log(books);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleDeleteBook = (_id) => {
    //console.log(_id);
    dispatch(deleteBook(_id));
  };
  const handleSignOut = () => {
    localStorage.removeItem("token");
    dispatch(logOut());
    navigate("/login");
  };
  return (
    <div>
      <h2>List of Books</h2>
      <table>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Name</th>
            <th>Author</th>
            <th>Price</th>
            {currentUser && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {books &&
            books.map(({ _id, name, author, price }) => (
              <tr key={_id}>
                {/* <td>{_id}</td> */}
                <td>{name}</td>
                <td>{author}</td>
                <td>{price}</td>
                {currentUser && (
                  <>
                    <td>
                      <Link
                        to="/edit-books"
                        state={{ _id, name, author, price }}
                      >
                        {/* <button>Edit</button> */}
                      </Link>
                      <button onClick={() => handleDeleteBook(_id)}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          {currentUser ? (
            <>
              <Link to="/add-books">
                <button>Add Books</button>
              </Link>

              <Button style={{ marginTop: "2rem" }} onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                style={{ marginTop: "2rem" }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log In
              </Button>
              <Button
                style={{ marginTop: "2rem" }}
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign In
              </Button>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BooksView;
