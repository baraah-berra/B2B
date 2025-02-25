import { useEffect, useRef } from "react";
import "./FilterGroup.css";
import FilterOption from "@ui/Products/ProductsList/Filters/FilterOption";

export default function FilterGroup({ filter, data, children }) {
    const buttonRef = useRef();
    const filtersRef = useRef();

    function showFilters() {
        filtersRef.current.style.display = "block";
        setTimeout(() => {
            buttonRef.current.classList.add("active");
        }, 100);
    }

    function hideFilters() {
        buttonRef.current.classList.remove("active");
        setTimeout(() => {
            if (filtersRef.current) {
                filtersRef.current.style.display = "none";
            }
        }, 310);
    }

    useEffect(() => {
        function handleClick(event) {
            if (filtersRef.current?.contains(event.target)) return;
            if (
                buttonRef.current === event.target &&
                !buttonRef.current?.classList.contains("active")
            ) {
                showFilters();
            } else hideFilters();
        }

        document.addEventListener("click", handleClick);
        document.addEventListener("scroll", hideFilters);
        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("scroll", hideFilters);
        };
    }, []);

    return (
        <div className="filter-group">
            <button className="important" ref={buttonRef}>
                {children}
            </button>
            <div ref={filtersRef}>
                {data.map((value, index) => (
                    <FilterOption filter={filter} value={value} key={index} />
                ))}
            </div>
        </div>
    );
}
