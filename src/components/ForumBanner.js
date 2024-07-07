import React from 'react';

const ForumBanner = ({ imgUrl, heading, subheading }) => {
    return (
        <div className="forum-banner" style={{ position: "relative", textAlign: "center", borderRadius: "10px" }}>
            <img 
                src={imgUrl || "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg"} 
                alt="Forum Banner" 
                className="banner-image" 
                style={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "contain", // Ensure the image covers the entire container
                    transition: "opacity 0.3s ease-in-out",
                    opacity: "0.8", // Set initial opacity to 0.8
                }}
            />
            <div className="banner-text" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <div className="banner-text-background" style={{ position: "absolute", top: "-10px", left: "-10px", right: "-10px", bottom: "-10px", backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(10px)", zIndex: "-1", borderRadius: "10px" }}></div>
                <h1 className="banner-heading" style={{ fontFamily: "Arial, sans-serif", fontSize: "2vw", fontWeight: "bold", "@media (max-width: 600px)": { fontSize: "32px" }, textShadow: "0 0 10px rgba(0, 0, 0, 0.3)", color: "white" }}>{heading}</h1>
                <h2 className="banner-sub" style={{ fontStyle: "italic", "@media (max-width: 600px)": { fontSize: "1vw" }, textShadow: "0 0 10px rgba(0, 0, 0, 0.3)", color: "white" }}>{subheading}</h2>
            </div>
        </div>
    );
}

export default ForumBanner;
