import { useContext } from "react";
import { favoritesContext, productsContext } from "@context/context";
import { setData } from "@utils/localStorage";

export default function useProducts() {
    const { products, setProducts } = useContext(productsContext);
    const { favorites, setFavorites } = useContext(favoritesContext);

    function getProduct(id) {
        return products[id - 1];
    }

    function searchProducts(search = "") {
        search = search?.toLowerCase();
        return products.filter(
            (p) =>
                p.title.toLowerCase().includes(search) ||
                p.description.toLowerCase().includes(search)
        );
    }

    function changeStock(product, stock) {
        product.stock = stock;
        product.qty = 0;

        const productsResult = products.map((value) =>
            value.id === product.id ? product : value
        );
        setProducts(productsResult);
        setData("products", productsResult);

        const favoritesResult = favorites.map((value) =>
            value.id === product.id ? product : value
        );
        setFavorites(favoritesResult);
        setData("favorites", favoritesResult);
    }

    return { products, getProduct, searchProducts, changeStock };
}
