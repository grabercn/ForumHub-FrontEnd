import React from 'react';
import PropTypes from 'prop-types';

/**
 * Represents the ForumHub SVG icon component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string|number} props.width - The width of the icon.
 * @param {string|number} props.height - The height of the icon.
 * @param {boolean} props.showText - Determines which SVG to show, based on text inclusion.
 * @returns {JSX.Element} The rendered SVG icon.
 */
const ForumHubIcon = ({ width = 70, height = 70, showText = false }) => {
  const iconSrc = showText
    ? `${process.env.PUBLIC_URL}/logos/BandWLogoNoBG.svg`
    : `${process.env.PUBLIC_URL}/logos/BandWLogoNoBGNoText.svg`;

  return (
    <img
      src={iconSrc}
      alt="ForumHub Icon"
      width={width}
      height={height}
    />
  );
};

ForumHubIcon.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showText: PropTypes.bool,
};

export default ForumHubIcon;
