import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InstagramIcon from '@mui/icons-material/Instagram';

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
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        {Auth.loggedIn() ? (
          <>
            <Button variant="outlined" style={{backgroundColor: 'orange'}} component={Link} to="/orderHistory" sx={{ mr: 2 }}>
              Order History
            </Button>
            <Button variant="outlined" style={{backgroundColor: 'orange'}} onClick={handleLogout}>
              Logout
            </Button>
            <Button variant="outlined" style={{backgroundColor: 'orange'}} component={Link} to="/store">
              Store
            </Button>
            <Button
              variant="outlined" style={{backgroundColor: 'orange'}} component={Link} to="/"
            >
              Home
            </Button>
            <Button
              variant="outlined" style={{backgroundColor: 'orange'}} component={Link} to="/about"
            >
              About
            </Button>
          </>
        ) : (
          <>
            <Button variant="outlined" component={Link} to="/signup" sx={{ mr: 2 }}>
              Signup
            </Button>
            <Button variant="outlined" component={Link} to="/login">
              Login
            </Button>
            <Button variant="outlined" component={Link} to="/store">
              Store
            </Button>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default Nav;