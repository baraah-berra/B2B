import { useContext } from "react";
import { cartContext } from "@context/context";
import { setData } from "@utils/localStorage";
import useProducts from "./useProducts";

export default function useCart() {
    const { cart, setCart } = useContext(cartContext);
    const { changeStock } = useProducts();

    function updateCart(value) {
        setCart(value);
        setData("cart", value);
    }

    function getCartProduct(id) {
        for (const product of cart) {
            if (product.id === id) return product;
        }
    }

    function inCart(id) {
        if (getCartProduct(id)) return true;
        return false;
    }

    function addToCart(product) {
        updateCart([...cart, { ...product, qty: 1 }]);
    }

    function removeFromCart(id) {
        updateCart(cart.filter((value) => value.id !== id));
    }

    function changeQty(product, qty) {
        let final = [...cart];

        if (!inCart(product.id)) {
            final = [...final, { ...product }];
        }

        let productTemp = { ...product };
        productTemp.qty = qty;

        updateCart(
            final.map((value) =>
                value.id === product.id ? productTemp : value
            )
        );
    }

    function getCartTotal() {
        return {
            items: cart.reduce((prev, curr) => prev + curr.qty, 0),
            price: cart.reduce((prev, curr) => prev + curr.price * curr.qty, 0),
        };
    }

    function buyProducts() {
        cart.map((product) =>
            changeStock(product, product.stock - product.qty)
        );
        clearCart();
    }

    function clearCart() {
        updateCart([]);
    }

    return {
        cart,
        getCartProduct,
        inCart,
        addToCart,
        removeFromCart,
        changeQty,
        getCartTotal,
        buyProducts,
        clearCart,
    };
}
