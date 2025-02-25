//contextProvider.jsx
import { useState } from "react";
import { getData } from "@utils/localStorage";
import productsData from "@data/products";
import {
    productsContext,
    cartContext,
    favoritesContext,
    popupsContext,
} from "./context";

export default function ContextProvider({ children }) {
    const [products, setProducts] = useState(getData("products", productsData));
    const [favorites, setFavorites] = useState(getData("favorites", []));
    const [cart, setCart] = useState(getData("cart", []));
    const [popups, setPopups] = useState({
        on: getData("popups", true),
        allPopups: [],
    });

    return (
        <productsContext.Provider value={{ products, setProducts }}>
            <cartContext.Provider value={{ cart, setCart }}>
                <favoritesContext.Provider value={{ favorites, setFavorites }}>
                    <popupsContext.Provider value={{ popups, setPopups }}>
                        {children}
                    </popupsContext.Provider>
                </favoritesContext.Provider>
            </cartContext.Provider>
        </productsContext.Provider>
    );
}
