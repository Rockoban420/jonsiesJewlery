import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li 
          className="mx-1"
          >
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1" >
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: '#FF5722',
      },
    },
  });


return (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h3" component="div" sx={{ flexGrow: 1, textAlign: 'center', margin: '0 24px', fontFamily: 'Didone', fontColor: 'lightpink' }}>
        <Link to="/" className="navbar-brand">
          Jonsie's Bones
        </Link>
      </Typography>
      <div>
        {showNavigation()}
      </div>
    </Toolbar>
  </AppBar>
);
}

export default Nav;
