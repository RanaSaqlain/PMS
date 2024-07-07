import React from "react";

const Image = ({ src, alt }) => {
    return <img src={src} alt={alt || ""} className="h-16 w-16 rounded-full" />;
};

export default Image;
