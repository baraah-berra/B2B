import "./ProductViewTitle.css";

export default function ProductViewTitle(props) {
    return (
        <div className="product-view-title">
            <h2 className="important">{props.title}</h2>
            <p>{props.description}</p>
        </div>
    );
}
