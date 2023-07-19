import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import { Container, Card, Typography, TextField, Button } from "@mui/material";

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value.toLowerCase(),
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
          Login
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
            label="Email address"
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

          {/* Rest of the form elements */}

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
      <Link to="/signup">← Go to Signup</Link>
    </Container>
  );
}

export default Login;
