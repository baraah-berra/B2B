import Header from "@ui/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@pages/Home";
import Cart from "@pages/Cart";
import NotFound from "@pages/NotFound";
import Favorites from "@pages/Favorites";
import Search from "@pages/Search";
import Product from "@pages/Product";
import ContextProvider from "@context/ContextProvider";
import Popup from "@components/Popup";

export default function App() {
    return (
        <ContextProvider>
            <Popup />
            <Header />
            <Routes>
                <Route index element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="/search" element={<Search />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/*" element={<Navigate replace to="/404" />} />
            </Routes>
        </ContextProvider>
    );
}
