import { useNavigate, useSearchParams } from "react-router-dom";
import "./SearchBar.css";

export default function SearchBar() {
    const navigate = useNavigate();
    const [searchParam] = useSearchParams();

    return (
        <form
            className="search"
            onSubmit={(e) => {
                e.preventDefault();
                e.target.search.blur();
                navigate(`/search?q=${e.target.search.value}`);
            }}
        >
            <input
                required
                name="search"
                type="text"
                placeholder="Search"
                defaultValue={searchParam.get("q")}
            />
            <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </form>
    );
}
