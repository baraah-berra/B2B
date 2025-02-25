import ImageLoader from "@components/ImageLoader";
import "./ProductImg.css";

export default function ProductImg({
    currentThumbnail,
    value,
    onClick,
    isSmallScreen,
}) {
    return (
        <button
            className={`product-img ${
                currentThumbnail === value ? "active" : ""
            }`}
            onClick={onClick}
        >
            {!isSmallScreen && <ImageLoader src={value} />}
        </button>
    );
}
