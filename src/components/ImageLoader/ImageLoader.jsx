import { useState } from "react";
import "./ImageLoader.css";

export default function ImageLoader({ src, alt = "" }) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <>
            {!isLoaded && <div className="image-loader"></div>}
            <img
                style={{ display: !isLoaded && "none" }}
                src={src}
                alt={alt}
                onLoad={() => setIsLoaded(true)}
                onError={() => setIsLoaded(true)}
            />
        </>
    );
}
