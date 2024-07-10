import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const CardContainer = styled('div')({
  margin: '16px', // Adjust margin as per your design
  width: '300px', // Fixed width for each card
  height: '100%', // Ensures cards are the same height
  borderRadius: '16px', // Rounded corners
  '@media (max-width: 600px)': {
    width: '100%', // Full width on small screens
  },
});

const CustomCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '16px', // Rounded corners
});

const CardHeader = styled('div')({
  padding: '8px',
  textAlign: 'center',
});

const PhotoContainer = styled(Paper)({
  display: 'flex',
  justifyContent: 'center',
});

const Photo = styled('img')({
  width: '100%',
  height: 'auto',
  margin: '8px',
});

const ForumName = styled(Typography)({
  marginBottom: '8px',
});

const Description = styled(Typography)({
  flexGrow: 1,
});

const ForumCard = ({ forum, onClick }) => {
  return (
    <CardContainer>
      <CustomCard variant="outlined" onClick={() => onClick(forum)}>
        <CardHeader>
          <PhotoContainer elevation={3}>
            <Photo
              src={forum.imgUrl || "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg"}
              alt="Forum Photo"
            />
          </PhotoContainer>
        </CardHeader>
        <CardContent>
          <ForumName variant="h5" component="div">
            {forum.forumName}
          </ForumName>
          <Description variant="body2" color="text.secondary">
            {forum.description}
          </Description>
        </CardContent>
      </CustomCard>
    </CardContainer>
  );
};

export default ForumCard;
