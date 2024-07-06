import React from 'react';

const ForumBanner = ({ imgUrl, heading, subheading }) => {
    return (
        <div className="forum-banner" style={{ position: "relative", textAlign: "center" }}>
            <img 
                src={imgUrl || "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg"} 
                alt="Forum Banner" 
                className="banner-image" 
                style={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "contain", // Ensure the image covers the entire container
                    transition: "opacity 0.3s ease-in-out",
                    opacity: "0.8" // Set initial opacity to 0.8
                }}
                onMouseEnter={(e) => e.target.style.opacity = "1"} // Set opacity to 1 on mouse enter
                onMouseLeave={(e) => e.target.style.opacity = "0.8"} // Set opacity back to 0.8 on mouse leave
            />
            <div className="banner-text" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <h1 className="banner-heading" style={{ fontFamily: "Arial, sans-serif", fontSize: "2vw", fontWeight: "bold", "@media (max-width: 600px)": { fontSize: "32px" } }}>{heading}</h1>
                <h2 className="banner-sub" style={{ fontStyle: "italic", "@media (max-width: 600px)": { fontSize: "1vw" } }}>{subheading}</h2>
            </div>
        </div>
    );
}

export default ForumBanner;
