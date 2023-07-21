import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Nav() {
  function handleLogout() {
    Auth.logout();
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: '#634A3C',
      },
    },
  });

  const user = Auth.getProfile();

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h2" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontFamily: 'Ultra' }}>
            <Link to="/" className="navbar-brand" style={{ color: '#E85022', textDecoration: 'none' }}>
              Jonesie's Bones
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }} >
        {Auth.loggedIn() ? (
          <>
            <Button variant="outlined" style={{backgroundColor: 'orange', marginRight: '5px'}} component={Link} to={`/user/${user.data._id}`} sx={{ mr: 2 }}>
              User Profile
            </Button>
            <Button variant="outlined" component={Link} to="/" sx={{ mx: 1 }}>
              Home
            </Button>
            <Button variant="outlined" component={Link} to="/about" sx={{ mx: 1 }}>
              About
            </Button>
            <Button variant="outlined" component={Link} to="/store" sx={{ mx: 1 }}>
              Store
            </Button>
            <Button variant="outlined" component={Link} to="/orderHistory" sx={{ mx: 1 }}>
              Order History
            </Button>
            <Button variant="outlined" onClick={handleLogout} sx={{ mx: 1 }}>
              Logout
            </Button>
            <Button
              variant="outlined" style={{backgroundColor: 'orange', marginRight: '5px'}} component={Link} to="/contact"
            >
              Contact
            </Button>
            
          </>
        ) : (
          <>
            <Button variant="outlined" component={Link} to="/signup" sx={{ mx: 1 }}>
              Signup
            </Button>
            <Button variant="outlined" component={Link} to="/login" sx={{ mx: 1 }}>
              Login
            </Button>
            <Button variant="outlined" component={Link} to="/store" sx={{ mx: 1 }}>
              Store
            </Button>
            <Button
              variant="outlined" style={{backgroundColor: 'orange', marginRight: '5px'}} component={Link} to="/"
            >
              Home
            </Button>
            <Button
              variant="outlined" style={{backgroundColor: 'orange', marginRight: '5px'}} component={Link} to="/about"
            >
              About
            </Button>
          
          </>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default Nav;