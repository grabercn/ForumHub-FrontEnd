import React, { useEffect, useRef } from "react";
import { update as jdenticonUpdate } from "jdenticon";
import { isNightMode } from "../Objects/theme";

const ProfileIcon = ({ username, size = 100 }) => {
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
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        data-jdenticon-value={username}
      />
    </div>
  );
};

export default ProfileIcon;
