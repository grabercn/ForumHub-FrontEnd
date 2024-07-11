import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

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
  /**
   * Represents a styled container for the card.
   *
   * @type {import('@mui/system').SxProps<import('@mui/system').Theme>}
   */
  const CardContainer = styled('div')({
    margin: '16px', // Adjust margin as per your design
    width: '300px', // Fixed width for each card
    height: '100%', // Ensures cards are the same height
    borderRadius: '16px', // Rounded corners
    '@media (max-width: 600px)': {
      width: '100%', // Full width on small screens
    },
  });

  /**
   * Represents a styled custom card component.
   *
   * @type {import('@mui/material/Card').CardTypeMap['defaultComponent']}
   */
  const CustomCard = styled(Card)({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '16px', // Rounded corners
  });

  /**
   * Represents a styled header for the card.
   *
   * @type {import('@mui/system').SxProps<import('@mui/system').Theme>}
   */
  const CardHeader = styled('div')({
    padding: '8px',
    textAlign: 'center',
  });

  /**
   * Represents a styled container for the forum photo.
   *
   * @type {import('@mui/material/Paper').PaperTypeMap['defaultComponent']}
   */
  const PhotoContainer = styled(Paper)({
    display: 'flex',
    justifyContent: 'center',
  });

  /**
   * Represents a styled image element for the forum photo.
   *
   * @type {import('react').DetailedHTMLProps<import('react').ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>}
   */
  const Photo = styled('img')({
    width: '100%',
    height: 'auto',
    margin: '8px',
  });

  /**
   * Represents a styled typography component for the forum name.
   *
   * @type {import('@mui/material/Typography').TypographyTypeMap['defaultComponent']}
   */
  const ForumName = styled(Typography)({
    marginBottom: '8px',
  });

  /**
   * Represents a styled typography component for the forum description.
   *
   * @type {import('@mui/material/Typography').TypographyTypeMap['defaultComponent']}
   */
  const Description = styled(Typography)({
    flexGrow: 1,
  });

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
