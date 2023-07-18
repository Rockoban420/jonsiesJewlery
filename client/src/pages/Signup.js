import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import { Container, Card, Typography, TextField, Button } from '@mui/material';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
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
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  /* return (
    <div className="container my-1">
      <Link to="/login">← Go to Login</Link>

      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="firstName">First Name:</label>
          <input
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="lastName">Last Name:</label>
          <input
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Signup; */

return (
  <Container maxWidth="sm" sx={{ marginTop: '1rem' }}>
    <Link to="/login">← Go to Login</Link>

    <Card sx={{ padding: '2rem', textAlign: 'center' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Sign Up
      </Typography>

      <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%'}}>
        <TextField
          label="First Name"
          placeholder="First"
          name="firstName"
          type="firstName"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          label="Last Name"
          placeholder="Last"
          name="lastName"
          type="lastName"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          label="Email"
          placeholder="youremail@test.com"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          label="Password"
          placeholder="******"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <div sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Card>
  </Container>
);
}

export default Signup;