import "./ProductCart.css";
import ProductTitle from "@ui/Product/ProductTitle";
import Thumbnail from "@ui/Product/Thumbnail";
import usePopups from "@hooks/usePopups";
import useCart from "@hooks/useCart";
import DollarPrice from "@components/DollarPrice";

export default function ProductCart(props) {
    const { addPopup } = usePopups();
    const { changeQty, removeFromCart } = useCart();
    const { id, title, price, stock, qty } = props;

    function update(value) {
        if (value) {
            changeQty(props, value);
        } else removeFromCart(id);
    }

    function check(event) {
        const value = +event.target.value;
        if (stock < value || !value) {
            event.target.value = qty;
            return;
        }
        update(value);
    }

    return (
        <div className="product-cart">
            <div className="left">
                <Thumbnail product={props} />
                <div className="actions">
                    <button
                        onClick={() => update(qty + 1)}
                        disabled={qty === stock}
                    >
                        <i className="fa-solid fa-plus"></i>
                    </button>
                    <input
                        min={1}
                        max={stock}
                        type="number"
                        name="qty"
                        value={qty}
                        onInput={check}
                    />
                    <button
                        onClick={() => update(qty - 1)}
                        disabled={qty === 1}
                    >
                        <i className="fa-solid fa-minus"></i>
                    </button>
                </div>
            </div>
            <div className="data">
                <ProductTitle id={id} title={title} />
                <div className="price">
                    <DollarPrice price={price * qty} />
                    <DollarPrice price={price} withBrackets />
                </div>
                <p className="stock">
                    <span className="important">
                        {stock > 10 ? "+10" : stock}
                    </span>{" "}
                    in Stock
                </p>
                <button
                    onClick={() => {
                        update(),
                            addPopup(
                                <>
                                    <i className="fa-solid fa-trash"></i>
                                    Product removed from the cart
                                </>,
                                "var(--red-color)"
                            );
                    }}
                >
                    <i className="fa-solid fa-trash"></i> Remove
                </button>
            </div>
        </div>
    );
}
