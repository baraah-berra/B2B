import "./Filters.css";
import categoriesData from "@data/categories";
import brandsData from "@data/brands";
import FilterGroup from "./FilterGroup";
import sortData from "@data/sort";
import { useSearchParams } from "react-router-dom";
import ItemsDisplay from "@components/ItemsDisplay";

export default function Filters() {
    const [filterParams] = useSearchParams();
    const categoryFilter = filterParams.getAll("category").length;
    const brandFilter = filterParams.getAll("brand").length;
    const sortFilter = filterParams.getAll("sort").length;

    return (
        <div className="filters">
            <FilterGroup filter="category" data={categoriesData}>
                <i className="fa-solid fa-layer-group">
                    <ItemsDisplay items={categoryFilter} />
                </i>{" "}
                Categories
            </FilterGroup>
            <FilterGroup filter="brand" data={brandsData}>
                <i className="fa-solid fa-copyright">
                    <ItemsDisplay items={brandFilter} />
                </i>{" "}
                Brands
            </FilterGroup>
            <FilterGroup filter="sort" data={sortData}>
                <i className="fa-solid fa-list">
                    <ItemsDisplay items={sortFilter} />
                </i>{" "}
                Sort
            </FilterGroup>
        </div>
    );
}
