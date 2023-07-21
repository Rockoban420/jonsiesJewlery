import React from 'react';
import { Card, CardContent, CardMedia, Container, Typography } from '@mui/material';
import kimImage from '../../pages/about/kim.jpg';

const AboutMe = () => {
  return (
    <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Card sx={{ maxWidth: 400, textAlign: 'left', backgroundColor: 'transparent', boxShadow: 'none', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <CardMedia
          component="img"
          src={kimImage}
          alt="Kim Jones"
          sx={{ width: '100%', height: '100%', maxHeight: '380px', objectFit: 'contain' }}
        />
      </Card>

      <Card sx={{ maxWidth: 400, textAlign: 'left', backgroundColor: 'transparent', boxShadow: 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem', }}>
        <CardContent>
          <Typography variant="body1">
          Kim Jones is a passionate jewelry creator based in the vibrant city of Portland, Oregon. Her love for exploring nature and the world around her has led her on a unique journey in jewelry making. She has a deep appreciation for ethically sourced materials, and she finds inspiration in the natural treasures she stumbles upon during her adventures.
          </Typography>
          <Typography variant="body1">
          As an eco-conscious artist, Kim specializes in crafting one-of-a-kind jewelry pieces using ethically sourced materials like bones, teeth, and even starfish. Each element she uses has its own story, making every piece truly unique and special. Kim believes in honoring nature's beauty by transforming these materials into stunning and meaningful jewelry.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AboutMe;
