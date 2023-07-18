import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import { Container, Card, Typography, TextField, Button } from '@mui/material';


function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
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
      [name]: value,
    });
  };

  /* return (
    <div className="container my-1">
      <Link to="/signup">← Go to Signup</Link>

      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email address:</label>
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
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login; */

return (
  <Container maxWidth="sm" sx={{ marginTop: '1rem' }}>
    <Link to="/signup">← Go to Signup</Link>

    <Card sx={{ padding: '2rem', textAlign: 'center' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Login
      </Typography>

      <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%'}}>
        <TextField
          label="Email address"
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

        {error && (
          <Typography variant="body1" sx={{ color: 'red' }}>
            The provided credentials are incorrect
          </Typography>
        )}

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

export default Login;