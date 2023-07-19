import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Nav from './components/Nav';
import Store from './pages/Store';
import About from './pages/About';
import { StoreProvider } from './utils/GlobalState';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';

import { createTheme, ThemeProvider, Box, IconButton } from '@mui/material';
//import InstagramIcon from '@mui/icons-material/Instagram';
import { Email, Instagram } from '@mui/icons-material';




const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#FE7E57', 
    },
    typography: {
      fontFamily: 'Didone',
    },
    
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
    <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              backgroundColor: '#FBEFD3',
            }}
          >
      <Router>
        <div>
          <StoreProvider>
            <Nav />
            <Routes>
              <Route 
                path="/" 
                element={<Home />} 
              />
              <Route
                path="/store"
                element={<Store />}
              />
              <Route
                path="/about"
                element={<About />}
              />
              <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route 
                path="/signup" 
                element={<Signup />} 
              />
              <Route 
                path="/success" 
                element={<Success />} 
              />
              <Route 
                path="/orderHistory" 
                element={<OrderHistory />} 
              />
              <Route 
                path="/products/:id" 
                element={<Detail />} 
              />
              <Route
                path="*" 
                element={<NoMatch />} 
              />
            </Routes>
          </StoreProvider>
        </div>
      </Router>
      <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              padding: '1rem',
              backgroundColor: '#FBEFD3',
            }}
          >
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <IconButton
                href="https://www.instagram.com/jonesiesbones/"
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
                sx={{ color: '#EEABCE' }}
              >
                <Instagram />
              </IconButton>
              <a href="mailto:jonesiesbones@gmail.com" style={{ color: '#EEABCE' }}>
                <Email />
              </a>
            </Box>
          </Box>
        </Box>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
