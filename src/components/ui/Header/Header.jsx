import Logo from "./Logo";
import Nav from "./Nav";
import SearchBar from "./SearchBar";
import "./Header.css";
import { useEffect, useRef, useState } from "react";
import Container from "@components/Container";

export default function Header() {
    const [scrollY, setScrollY] = useState(window.scrollY);
    const headerRef = useRef();

    useEffect(() => {
        function handleScroll() {
            if (scrollY > window.scrollY) {
                headerRef.current.classList.remove("hide");
            } else headerRef.current.classList.add("hide");
            setScrollY(window.scrollY);
        }
        document.addEventListener("scroll", handleScroll);
        return () => document.removeEventListener("scroll", handleScroll);
    }, [scrollY]);

    return (
        <header ref={headerRef}>
            <Container>
                <Logo />
                <SearchBar />
                <Nav />
            </Container>
        </header>
    );
}
