import useCart from "@hooks/useCart";
import usePopups from "@hooks/usePopups";
import "./Total.css";
import DollarPrice from "@components/DollarPrice";

export default function Total() {
    const { cart, clearCart, getCartTotal, buyProducts } = useCart();
    const { items, price } = getCartTotal();
    const { addPopup } = usePopups();

    return (
        <div className="total">
            <div className="items">
                <p>
                    Items: <span className="important">{cart.length}</span>
                </p>
            </div>
            <div className="price">
                <p>
                    Total (<span className="important">{items}</span>
                    ):
                </p>
                <DollarPrice price={price} />
            </div>
            <button
                className="clear"
                onClick={() => {
                    clearCart(),
                        addPopup(
                            <>
                                <i className="fa-solid fa-trash-can"></i> All
                                products removed from the Cart
                            </>,
                            "var(--red-color)"
                        );
                }}
            >
                <i className="fa-solid fa-trash-can"></i> Clear All
            </button>
            <button
                className="buy"
                onClick={() => {
                    buyProducts(),
                        addPopup(
                            <>
                                <i className="fa-solid fa-basket-shopping"></i>{" "}
                                Products bought successfully
                            </>
                        );
                }}
            >
                <i className="fa-solid fa-cash-register"></i> Buy All
            </button>
        </div>
    );
}
