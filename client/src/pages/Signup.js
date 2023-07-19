import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import { Container, Card, Typography, TextField, Button } from "@mui/material";

function Signup(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const lowerCaseValue = value.toLowerCase();
    setFormState({
      ...formState,
      [name]: lowerCaseValue,
    });
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "1rem", textAlign: "center" }}>
      <Card
        sx={{
          padding: "2rem",
          textAlign: "center",
          backgroundColor: "transparent",
        }}
      >
        <Typography
          variant="h4"
          component="h3"
          gutterBottom
          sx={{ color: "#E85022", fontFamily: "Ultra", fontWeight: "bold" }}
        >
          Sign Up
        </Typography>

        <form
          onSubmit={handleFormSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
          }}
        >
          <TextField
            style={{ backgroundColor: "white" }}
            label="First Name"
            placeholder="First"
            name="firstName"
            type="firstName"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />

          <TextField
            style={{ backgroundColor: "white" }}
            label="Last Name"
            placeholder="Last"
            name="lastName"
            type="lastName"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />

          <TextField
            style={{ backgroundColor: "white" }}
            label="Email"
            placeholder="youremail@test.com"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />

          <TextField
            style={{ backgroundColor: "white" }}
            label="Password"
            placeholder="******"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />

          <div
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "1rem",
            }}
          >
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Card>
      <Link to="/login">← Go to Login</Link>
    </Container>
  );
}

export default Signup;
