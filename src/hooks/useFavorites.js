import { useContext } from "react";
import { favoritesContext } from "@context/context";
import { setData } from "@utils/localStorage";

export default function useFavorites() {
    const { favorites, setFavorites } = useContext(favoritesContext);

    function updateFavorites(value) {
        setFavorites(value);
        setData("favorites", value);
    }

    function inFavorites(id) {
        for (const product of favorites) {
            if (product.id === id) return true;
        }
        return false;
    }

    function addFavorite(product) {
        updateFavorites([...favorites, product]);
    }

    function removeFavorite(id) {
        updateFavorites(favorites.filter((value) => value.id !== id));
    }

    return { favorites, inFavorites, addFavorite, removeFavorite };
}
