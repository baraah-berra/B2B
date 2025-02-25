import { Link } from "react-router-dom";
import "./Logo.css";

export default function Logo() {
    return (
        <Link
            className="important logo"
            to="/"
            onClick={() => window.scrollTo(0, 0)}
        >
            <i className="fa-solid fa-shop"></i>
            <span>B2B</span>
        </Link>
    );
}
