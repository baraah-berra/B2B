import "./DollarPrice.css";

export default function DollarPrice({ price, withBrackets = false }) {
    return withBrackets ? (
        <p className="dollar-price">
            (<span>$</span> {price})
        </p>
    ) : (
        <p className="dollar-price">
            <span>$</span> {price}
        </p>
    );
}
