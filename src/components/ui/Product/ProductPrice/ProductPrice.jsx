import DollarPrice from "@components/DollarPrice";
import "./ProductPrice.css";

export default function ProductPrice({ price, discountPercentage }) {
    discountPercentage = Math.round(discountPercentage);

    return (
        <div className="price">
            <DollarPrice price={price.toFixed(2)} />
            <div className="old">
                <DollarPrice
                    price={Math.round(
                        (price / (100 - discountPercentage)) * 100
                    ).toFixed(2)}
                />
                <span className="discount">{discountPercentage}% OFF</span>
            </div>
        </div>
    );
}
