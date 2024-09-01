import React from 'react';
import PropTypes from 'prop-types';
import { isNightMode } from '../Objects/theme';

/**
 * Represents the ForumHub SVG icon component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string|number} props.width - The width of the icon.
 * @param {string|number} props.height - The height of the icon.
 * @param {('normal' | 'noUnderline' | 'noText)} props.variant - Determines which SVG to show based on the variant.
 * @returns {JSX.Element} The rendered SVG icon.
 */
const ForumHubIcon = ({ width = 70, height = 70, variant = 'normal' }) => {
  let iconSrc = '';

  switch (variant) {
    case 'normal':
      if (isNightMode()) {
        iconSrc = `${process.env.PUBLIC_URL}/logos/DarkModeBandWLogoNoBG.svg`;
      }else{
        iconSrc = `${process.env.PUBLIC_URL}/logos/BandWLogoNoBG.svg`;
      }
      break;
    case 'noUnderline':
      if (isNightMode()) {
        iconSrc = `${process.env.PUBLIC_URL}/logos/DarkModeBandWLogoNoBGNoTextNoUnderline.svg`;
      }else{
        iconSrc = `${process.env.PUBLIC_URL}/logos/BandWLogoNoBGNoTextNoUnderline.svg`;
      }
      break;
    case 'noText':
      iconSrc = `${process.env.PUBLIC_URL}/logos/BandWLogoNoBGNoText.svg`;
      break;
    default:
      iconSrc = `${process.env.PUBLIC_URL}/logos/BandWLogoNoBG.svg`;
  }

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
  variant: PropTypes.oneOf(['normal', 'noUnderline', 'noText']),
};

export default ForumHubIcon;
