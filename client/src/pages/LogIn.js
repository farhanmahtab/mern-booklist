import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "reactstrap";
import { logIn } from "../features/users/UserSlice";

function LogInPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Container>
      <h2>Log In</h2>
      <div className="form-field">
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          className="form-inputs"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="password">Password: </label>
        <input
          className="form-inputs"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        color="dark"
        style={{ marginBottom: "2rem" }}
        onClick={() => {
          const user = {
            email,
            password,
          };
          if (email && password) {
            dispatch(logIn(user)).then(navigate("/"));
          }
        }}
      >
        Log In
      </Button>
      <Button
        color="dark"
        style={{ marginBottom: "2rem", marginLeft: "1rem" }}
        onClick={() => {
          navigate("/signup")
        }}
      >
        Sign Up
      </Button>
    </Container>
  );
}

export default LogInPage;
