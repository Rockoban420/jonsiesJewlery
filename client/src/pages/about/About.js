import React from 'react';
import { Card, CardContent, CardMedia, Container, Typography } from '@mui/material';
import kimImage from '../../pages/about/kim.jpg';

const AboutMe = () => {
  return (
    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Card sx={{ maxWidth: 500, textAlign: 'center', backgroundColor: 'transparent', boxShadow: 'none' }}>
        <CardMedia
          component="img"
          height="200"
          src={kimImage}
          alt="Kim Jones"
          sx={{ borderRadius: '50%', margin: '20px auto 0', width: 250, height: 250, border: '2px solid white' }}
        />
        <CardContent>
          <Typography variant="h4" sx={{ fontFamily: 'Ultra', color: '#674B3D' }} gutterBottom>
            Hi, I'm Kim Jones!
          </Typography>
          <Typography variant="body1">
            I'm a passionate jewelry creator based in the vibrant city of Portland, Oregon. My love for exploring nature
            and the world around me has led me on a unique journey in jewelry making. I have a deep appreciation for
            ethically sourced materials, and I find inspiration in the natural treasures I stumble upon during my
            adventures.
          </Typography>
          <Typography variant="body1">
            As an eco-conscious artist, I specialize in crafting one-of-a-kind jewelry pieces using ethically sourced
            materials like bones, teeth, and even starfish. Each element I use has its own story, making every piece
            truly unique and special. I believe in honoring nature's beauty by transforming these materials into
            stunning and meaningful jewelry.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AboutMe;
