import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
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

  // Add state to manage menu open/close
  const [anchorEl, setAnchorEl] = useState(null);

  // Function to handle menu open
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h2" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontFamily: 'Ultra' }}>
            <Link to="/" className="navbar-brand" style={{ color: '#E85022', textDecoration: 'none' }}>
              Jonesie's Bones
            </Link>
          </Typography>
          {/* Add menu toggle button */}
          <IconButton onClick={handleMenuOpen} sx={{ display: { xs: 'block', md: 'none' } }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* Use a menu list instead of individual buttons */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', my: 2 }}>
        {Auth.loggedIn() ? (
          <>
            <Button variant="outlined" sx={{ mx: 1 }} component={Link} to={`/user/${user.data._id}`}>
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
            <Button variant="outlined" component={Link} to="/contact" sx={{ mx: 1 }}>
              Contact
            </Button>
            <Button variant="outlined" onClick={handleLogout} sx={{ mx: 1 }}>
              Logout
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
            <Button variant="outlined" component={Link} to="/" sx={{ mx: 1 }}>
              Home
            </Button>
            <Button variant="outlined" component={Link} to="/store" sx={{ mx: 1 }}>
              Store
            </Button>
            <Button variant="outlined" component={Link} to="/About" sx={{ mx: 1 }}>
              About
            </Button>
            <Button variant="outlined" component={Link} to="/Contact" sx={{ mx: 1 }}>
              Contact
            </Button>
          </>
        )}
      </Box>
      {/* Menu list for mobile view */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {Auth.loggedIn() ? (
          <>
            <MenuItem onClick={handleMenuClose} component={Link} to={`/user/${user.data._id}`}>
              User Profile
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/">
              Home
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/about">
              About
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/store">
              Store
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/orderHistory">
              Order History
            </MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); handleLogout(); }}>
              Logout
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/contact">
              Contact
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={handleMenuClose} component={Link} to="/signup">
              Signup
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/login">
              Login
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/">
              Home
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/store">
              Store
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/about">
              About
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/contact">
              Contact
            </MenuItem>
          </>
        )}
      </Menu>
    </ThemeProvider>
  );
}

export default Nav;