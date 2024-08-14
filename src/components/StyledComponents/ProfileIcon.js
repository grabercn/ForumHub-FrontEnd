import React, { useEffect, useRef } from "react";
import { update as jdenticonUpdate } from "jdenticon";
import { isNightMode } from "../Objects/theme";

/**
 * Component for rendering a profile icon.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.username - The username used for generating the icon.
 * @param {string} [props.imgUrl=""] - The URL of the profile image if one exists.
 * @param {number} [props.size=100] - The size of the icon in pixels.
 * @param {string} [props.linkTo=""] - The link to navigate when the icon is clicked.
 * @returns {JSX.Element} The rendered profile icon component.
 */
const ProfileIcon = ({ username,imgUrl="", size = 100, linkTo="" }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (username) {
      jdenticonUpdate(svgRef.current, username);
    }
  }, [username]);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%", // Make the div circular
        overflow: "hidden", // Ensure the SVG doesn't overflow the circle
        border: isNightMode() ? "2px solid white"  :"2px solid #000", // Add a border around the circle
      }}
    >
      {imgUrl ? (
        <img
          src={imgUrl}
          alt="Profile"
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
