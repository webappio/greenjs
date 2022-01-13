import React from "react";

const PlaceholderImage = ({ height, width, text, style = {} }) => {
    return (
        <div style={{ 
            height: height, 
            width: width, 
            color: "black", 
            backgroundColor: "#C4C4C4", 
            borderRadius: "10px", 
            padding: "5px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            ...style,
        }}>
            <small>{text}</small>
        </div>
    )
}

export {
    PlaceholderImage,
}