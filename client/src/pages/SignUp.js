import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "reactstrap";
import { signUp } from "../features/users/UserSlice";;

function SignUpPage() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

 

  return (
    <Container>
      <h2>Sign Up</h2>
      <div className="form-field">
        <label htmlFor="name">Name: </label>
        <input
          className="form-inputs"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="email">Email: </label>
        <input
          className="form-inputs"
          type="email"
          id="email"
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
            name,
            email,
            password,
          };
          if (name && email && password) {
            dispatch(signUp(user)).then(navigate("/showbooks"));
          }
        }}
      >
        Sign Up
      </Button>
      <Button
        color="dark"
        style={{ marginBottom: "2rem", marginLeft: "1rem" }}
        onClick={() => {
          navigate("/login");
        }}
      >
        Log in
      </Button>
    </Container>
  );
}

export default SignUpPage;
