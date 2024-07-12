import React from 'react';
import { useMediaQuery } from '@mui/material';

/**
 * Renders a forum banner component.
 * @param {Object} props - The component props.
 * @param {string} props.imgUrl - The URL of the banner image.
 * @param {string} props.heading - The heading text for the banner.
 * @param {string} props.subheading - The subheading text for the banner.
 * @returns {JSX.Element} The rendered forum banner component.
 */
const ForumBanner = ({ imgUrl, heading, subheading }) => {
    const isMobile = useMediaQuery('(max-width: 600px)');

    return (
        <div className="forum-banner" style={{ position: "relative", textAlign: "center", borderRadius: "10px" }}>
            <img 
                src={imgUrl || "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg"} 
                alt="Forum Banner" 
                className="banner-image" 
                style={{ 
                    width: "100%", 
                    height: isMobile ? "auto" : "100%", 
                    objectFit: isMobile ? "contain" : "contain",
                    transition: "opacity 0.3s ease-in-out",
                    opacity: "0.8", // Set initial opacity to 0.8
                }}
            />
            <div className="banner-text" style={{ 
                position: isMobile ? "relative" : "absolute", 
                top: isMobile ? "auto" : "50%", 
                left: isMobile ? "0%" : "50%", 
                transform: isMobile ? "translate(0, 0)" : "translate(-50%, -50%)", 
                marginTop: isMobile ? "10px" : "0", 
                paddingBottom: isMobile ? "10px" : "0",
            }}>
                {!isMobile && (
                    <div className="banner-text-background" style={{ 
                        position: "absolute", 
                        top: "-10px", 
                        left: "-10px", 
                        right: "-10px", 
                        bottom: "-10px", 
                        backgroundColor: "rgba(0, 0, 0, 0.5)", 
                        backdropFilter: "blur(10px)", 
                        zIndex: "-1", 
                        borderRadius: "10px" 
                    }}></div>
                )}
                <h1 className="banner-heading" style={{ 
                    fontFamily: "Arial, sans-serif", 
                    fontSize: isMobile ? "32px" : "2vw", 
                    fontWeight: "bold", 
                    textShadow: "0 0 10px rgba(0, 0, 0, 0.3)", 
                    color: "white" 
                }}>
                    {heading}
                </h1>
                <h2 className="banner-sub" style={{ 
                    fontStyle: "italic", 
                    fontSize: isMobile ? "20px" : "1.5vw", 
                    textShadow: "0 0 10px rgba(0, 0, 0, 0.3)", 
                    color: "white" 
                }}>
                    {subheading}
                </h2>
            </div>
        </div>
    );
}

export default ForumBanner;
