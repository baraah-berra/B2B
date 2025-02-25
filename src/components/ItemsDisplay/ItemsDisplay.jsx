import "./ItemsDisplay.css";

export default function ItemsDisplay({ items }) {
    return (
        <span
            className="items-display important"
            style={{ display: items ? "flex" : "none" }}
        >
            {items > 9 ? "+9" : items}
        </span>
    );
}
