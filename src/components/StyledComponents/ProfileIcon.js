import React, { useEffect, useRef, useState } from "react";
import { update as jdenticonUpdate } from "jdenticon";
import { isNightMode } from "../Objects/theme";

/**
 * Component for rendering a profile icon with an optional image or a jdenticon-generated SVG as a fallback.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.username - The username used for generating the icon.
 * @param {string} [props.imgUrl=""] - The URL of the profile image if one exists.
 * @param {number} [props.size=100] - The size of the icon in pixels.
 * @param {string} [props.linkTo=""] - The link to navigate when the icon is clicked.
 * @param {boolean} [props.outline=true] - Whether to show an outline around the icon.
 * @returns {JSX.Element} The rendered profile icon component.
 */
const ProfileIcon = ({ username, imgUrl = "", size = 100, linkTo = "", outline = true }) => {
  const svgRef = useRef(null);
  const [imgError, setImgError] = useState(false); // Track image load errors

  // Generate jdenticon SVG when username changes
  useEffect(() => {
    if (username) {
      jdenticonUpdate(svgRef.current, username);
    }
  }, [username]);

  // Error handler for the image
  const handleImgError = () => {
    setImgError(true); // Set error state to show fallback SVG
  };

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%", // Make the div circular
        overflow: "hidden", // Ensure the SVG or image doesn't overflow the circle
        border: outline ? (isNightMode() ? "2px solid white" : "2px solid #000") : "", // Add a border based on night mode
      }}
    >
      {!imgError && imgUrl ? (
        <img
          src={imgUrl}
          alt="Profile"
          onError={handleImgError} // Handle error if image fails to load
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          data-jdenticon-value={username}
          to={linkTo}
        />
      )}
    </div>
  );
};

export default ProfileIcon;
