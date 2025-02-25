import { useSearchParams } from "react-router-dom";
import "./FilterOption.css";

export default function FilterOption({ filter, value }) {
    const [filterParams, setFilterParams] = useSearchParams();
    const allFilters = filterParams.getAll(filter);

    function update() {
        if (filterParams.has(filter, value)) filterParams.delete(filter, value);
        else {
            if (filter === "sort") filterParams.set(filter, value);
            else filterParams.append(filter, value);
        }
        setFilterParams(filterParams);
    }

    return (
        <button className="filter-option" onClick={update}>
            <i
                className={
                    allFilters.includes(value)
                        ? "fa-solid fa-square-check"
                        : "fa-regular fa-square"
                }
            ></i>
            {value.replace("-", " ")}
        </button>
    );
}
