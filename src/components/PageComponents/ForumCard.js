import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import LoadingSpinner from '../StyledComponents/LoadingSpinner';

/**
 * Represents a card component for displaying forum information.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.forum - The forum object containing forum details.
 * @param {Function} props.onClick - The function to be called when the card is clicked.
 * @returns {JSX.Element} The rendered card component.
 */
const ForumCard = ({ forum, onClick }) => {
  const [loading, setLoading] = useState(true);

  const CardContainer = styled('div')(({ theme }) => ({
    margin: theme.spacing(2),
    width: '100%', // Ensure full width of container
    maxWidth: '300px',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    boxShadow: theme.shadows[5],
    background: theme.palette.background.paper,
    '@media (max-width: 600px)': {
      maxWidth: '100%',
    },
  }));

  const CustomCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    background: theme.palette.background.default,
  }));

  const CardHeader = styled('div')({
    position: 'relative',
    height: '150px',
    overflow: 'hidden',
    borderBottom: '4px solid',
    borderColor: 'transparent', // Placeholder border color, can be set dynamically
  });

  const PhotoContainer = styled(Paper)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    padding: theme.spacing(1),
    boxSizing: 'border-box',
  }));

  const Photo = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: loading ? 'none' : 'block',
    position: 'absolute',
    top: 0,
    left: 0,
  });

  const ForumName = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(1),
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.text.primary,
  }));

  const Description = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
  }));

  const truncateText = (text, length) => {
    return text.length <= length ? text : `${text.substring(0, length)}...`;
  };

  return (
    <CardContainer>
      <CustomCard variant="outlined" onClick={() => onClick(forum)}>
        <CardHeader style={{ borderColor: forum.borderColor || '#3f51b5' }}>
          <PhotoContainer elevation={3}>
            <LoadingSpinner loading={loading} />
            <Photo
              src={forum.imgUrl || "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg"}
              alt="Forum Photo"
              onLoad={() => setLoading(false)}
              onError={() => setLoading(false)}
            />
          </PhotoContainer>
        </CardHeader>
        <CardContent>
          <ForumName variant="h6" component="div">
            {forum.forumName}
          </ForumName>
          <Description variant="body2">
            {truncateText(forum.forumDescription, 20)}
          </Description>
        </CardContent>
      </CustomCard>
    </CardContainer>
  );
};

export default ForumCard;
