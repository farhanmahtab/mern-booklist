import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.usersReducer);
  return (
    <nav>
      {/* <Link to='/' className='nav-link'>Home</Link> */}
      <Link to="/" className="nav-link">
        Show Books
      </Link>
      {currentUser ? (
        <Link to="/add-books" className="nav-link">
          Add Books
        </Link>
      ) : (
        <Link to="/signup" className="nav-link">
          Sign Up
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
