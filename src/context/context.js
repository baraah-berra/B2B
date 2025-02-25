//contexts.js 
import { createContext } from "react";

const productsContext = createContext({
    products: [],
    setProducts: () => {},
});

const cartContext = createContext({
    cart: [],
    setCart: () => {},
});

const favoritesContext = createContext({
    favorites: [],
    setFavorites: () => {},
});

const popupsContext = createContext({
    popups: { on: true, allPopups: [] },
    setPopups: () => {},
});

export { productsContext, cartContext, favoritesContext, popupsContext };
