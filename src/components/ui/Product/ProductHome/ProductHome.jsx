//productHome.jsx
import "./ProductHome.css";
import Thumbnail from "@ui/Product/Thumbnail";
import ProductTitle from "@ui/Product/ProductTitle";
import ProductPrice from "@ui/Product/ProductPrice";
import usePopups from "@hooks/usePopups";
import useCart from "@hooks/useCart";
import { useNavigate } from "react-router-dom";

export default function ProductHome(props) {
    const {
        id,
        title,
        rating,
        description,
        category,
        price,
        stock,
        discountPercentage,
    } = props;
    const navigate = useNavigate();
    const { addPopup } = usePopups();
    const { inCart, removeFromCart, addToCart } = useCart();
    const isInCart = inCart(id);

    function update() {
        isInCart ? removeFromCart(id) : addToCart(props);
    }

    return (
        <div className="product-home">
            <Thumbnail product={props} />
            <div className="data">
                <ProductTitle id={id} title={title} />
                <p>{description}</p>
                <button
                    className="category"
                    onClick={() => navigate(`/?category=${category}#products`)}
                >
                    {category}
                </button>
                <ProductPrice
                    discountPercentage={discountPercentage}
                    price={price}
                />
                <div className="bottom">
                    {stock ? (
                        <button
                            onClick={() => {
                                update(),
                                    addPopup(
                                        isInCart ? (
                                            <>
                                                <i className="fa-solid fa-trash"></i>
                                                Product removed from the cart
                                            </>
                                        ) : (
                                            <>
                                                <i className="fa-solid fa-cart-plus"></i>
                                                Product added to the Cart
                                            </>
                                        ),
                                        isInCart && "var(--red-color)"
                                    );
                            }}
                        >
                            <i
                                className={`${
                                    isInCart
                                        ? "fa-solid fa-cart-arrow-down"
                                        : "fa-solid fa-cart-plus"
                                } cart-action important`}
                            ></i>
                        </button>
                    ) : (
                        <span className="out">Out of stock</span>
                    )}
                    <span className="rating">
                        <i className="fa-solid fa-star"></i>
                        {rating.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
}
