import { useState } from "react";
import "./Nav.css";
import { useRef, useEffect } from "react";
import { getData, setData } from "@utils/localStorage";
import NavItem from "./NavItem";
import usePopups from "@hooks/usePopups";
import useCart from "@hooks/useCart";
import useFavorites from "@hooks/useFavorites";

export default function Nav() {
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        const theme = getData("isDarkTheme", true);
        !theme && document.documentElement.classList.add("light");
        return theme;
    });
    const barsRef = useRef();
    const navRef = useRef();
    const cartItems = useCart().getCartTotal().items;
    const favoritesItems = useFavorites().favorites.length;
    const { popupState, setPopupState } = usePopups();

    function hideNav() {
        barsRef.current.classList.remove("active");
    }

    function showNav() {
        barsRef.current.classList.add("active");
    }

    function changeTheme() {
        setIsDarkTheme(!isDarkTheme);
        document.documentElement.classList.toggle("light");
        setData("isDarkTheme", !isDarkTheme);
    }

    useEffect(() => {
        function handleClick(e) {
            if (
                barsRef.current.contains(e.target) &&
                !barsRef.current.classList.contains("active")
            ) {
                return showNav();
            }
            hideNav();
        }
        document.addEventListener("click", handleClick);
        document.addEventListener("scroll", hideNav);
        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("scroll", hideNav);
        };
    }, []);

    return (
        <nav>
            <button ref={barsRef} className="bars">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div className="nav-items" ref={navRef}>
                <NavItem
                    link="/cart"
                    title="Cart"
                    iconProps={{ className: "fa-solid fa-cart-shopping" }}
                    items={cartItems}
                />
                <NavItem
                    link="/favorites"
                    title="Favorites"
                    iconProps={{ className: "fa-solid fa-heart" }}
                    items={favoritesItems}
                />
                <NavItem
                    onClick={changeTheme}
                    title={isDarkTheme ? "Light Mode" : "Dark Mode"}
                    iconProps={{
                        style: { transition: "transform 0.3s" },
                        className:
                            "fa-solid fa-circle-half-stroke " +
                            (!isDarkTheme && "fa-flip-horizontal"),
                    }}
                />
                <NavItem
                    onClick={() => setPopupState(!popupState)}
                    title={`${popupState ? "Deactivate" : "Activate"} Popups`}
                    iconProps={{
                        className: `fa-${
                            popupState ? "regular" : "solid"
                        } fa-bell`,
                    }}
                />
            </div>
        </nav>
    );
}
