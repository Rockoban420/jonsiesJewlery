import React from "react";
import { Container, Typography, TextField, Button } from '@mui/material';

const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const message = event.target.message.value;

    const mailtoLink = `mailto:jonesiesbones@gmail.com?subject=Contact Form Submission&body=Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;

    window.location.href = mailtoLink;
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
      <Typography variant="h3" sx={{ fontFamily: 'Ultra', color: '#674B3D' }} gutterBottom>
        Contact Us
      </Typography>
      <div style={{ backgroundColor: 'transparent', padding: '2rem', textAlign: 'center', width: '100%', height: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', width: '100%' }}>
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            required
            InputProps={{ style: { backgroundColor: 'white' } }}
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            InputProps={{ style: { backgroundColor: 'white' } }}
          />
          <TextField
            id="message"
            name="message"
            label="Message"
            multiline
            rows={6}
            variant="outlined"
            fullWidth
            required
            InputProps={{ style: { backgroundColor: 'white' } }}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Contact;
