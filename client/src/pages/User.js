import React, { useState } from "react";
import { Button, Typography, Card, CardContent, Container, TextField, CardActions } from "@mui/material";
import { QUERY_USER } from "../utils/queries";
import { UPDATE_USER, DELETE_USER } from "../utils/mutations";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";

const User = () => {
  const { loading, data } = useQuery(QUERY_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  const [formState, setFormState] = useState({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
  });
  const user = data?.user || {};
  const userId = Auth.getProfile().data._id;

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await deleteUser({
        variables: {
          id: userId,
        },
      });
      console.log(data);
      Auth.logout();
      window.location.assign("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      switch (e.target.childNodes[1].id) {
        case "firstName":
          const { fdata } = await updateUser({
            variables: {
              firstName: formState.firstName,
            },
          });
          console.log(fdata);
          break;
        case "lastName":
          const { ldata } = await updateUser({
            variables: {
              lastName: formState.lastName,
            },
          });
          console.log(ldata);
          break;
        case "email":
          const { edata } = await updateUser({
            variables: {
              email: formState.email,
            },
          });
          console.log(edata);
          break;
        default:
          break;
      }

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: '1' }}>
      <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none', textAlign: 'center', width: '100%' }}>
          <Typography variant="h3" sx={{ color: '#674B3D', fontFamily: 'Ultra', mb: 2 }}>User Profile</Typography>
          <Typography variant="h5" sx={{ fontFamily: 'Ultra', color: '#89C6E7' }}>Name: {user.firstName}</Typography>
          <Typography variant="h5" sx={{ fontFamily: 'Ultra', color: '#89C6E7' }}>Last Name: {user.lastName}</Typography>
          <Typography variant="h5" sx={{ fontFamily: 'Ultra', color: '#89C6E7' }}>Email: {user.email}</Typography>
      </Card>

<Card sx={{ backgroundColor: 'transparent', boxShadow: 'none', textAlign: 'center', width: '95%', m: 'auto', pt: '7rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <Typography variant="h5" sx={{ color: '#674B3D', fontFamily: 'Ultra', mb: 2 }}>Update Profile</Typography>
  <form
    onSubmit={handleSubmit}
    style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', width: '100%' }}
  >
    <TextField
      id="firstName"
      name="firstName"
      label="First Name"
      variant="outlined"
      value={formState.firstName}
      onChange={handleChange}
      sx={{ width: '85%', backgroundColor: 'white', '& .MuiInputLabel-root': { left: 0 } }}
    />
    <Button id="firstName" variant="contained" color="primary" type="submit">
      Update
    </Button>
    </form>
    <form
    onSubmit={handleSubmit}
    style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', width: '100%' }}
    >
    <TextField
      id="lastName"
      name="lastName"
      label="Last Name"
      variant="outlined"
      value={formState.lastName}
      onChange={handleChange}
      sx={{ width: '85%', backgroundColor: 'white', '& .MuiInputLabel-root': { left: 0 } }}
    />
    <Button id="lastName" variant="contained" color="primary" type="submit">
      Update
    </Button>
    </form>
    <form
    onSubmit={handleSubmit}
    style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', width: '100%' }}
    >
    <TextField
      id="email"
      name="email"
      label="Email"
      type="email"
      variant="outlined"
      value={formState.email}
      onChange={handleChange}
      sx={{ width: '85%', backgroundColor: 'white', '& .MuiInputLabel-root': { left: 0 } }}
    />
    <Button id="email" variant="contained" color="primary" type="submit">
      Update
    </Button>
  </form>
</Card>






      <Button
        variant="contained"
        color="secondary"
        style={{ marginTop: '6rem', backgroundColor: '#FE7E57', color: 'black', alignItems: 'center' }}
        onClick={handleDelete}
      >
        Delete Account
      </Button>
    </Container>
  );
};

export default User;
