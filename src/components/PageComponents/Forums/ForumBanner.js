import React from 'react';
import AnimationTag from '../../StyledComponents/AnimationTag';

/**
 * Renders a modern forum banner component.
 * @param {Object} props - The component props.
 * @param {string} props.imgUrl - The URL of the banner image.
 * @param {string} props.heading - The heading text for the banner in "Name,State,Country" format.
 * @param {string} props.subheading - The subheading text for the banner.
 * @returns {JSX.Element} The rendered forum banner component.
 */
const ForumBanner = ({ imgUrl, heading, subheading }) => {
  // Extract the title before the first comma
  const title = heading.split(',')[0];

  return (
    <AnimationTag variant="slide">
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '16px',
          margin: '20px auto',
          maxWidth: '1000px',
          width: '100%',
        }}
      >
        <img
          src={
            imgUrl ||
            "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg"
          }
          alt="Forum Banner"
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '16px', // Ensures the overlay follows the curved corners
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontFamily: '"Roboto", sans-serif',
              fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
              fontWeight: 'bold',
              margin: '0 0 10px',
              textShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontFamily: '"Roboto", sans-serif',
              fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
              maxWidth: '80%',
              margin: 0,
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            {subheading}
          </p>
        </div>
      </div>
    </AnimationTag>
  );
};

export default ForumBanner;
