import arrayToLowerCase from "@utils/arrayToLowerCase";
import sortProducts from "@utils/sortProducts";
import { useSearchParams } from "react-router-dom";

export default function useFilter(products) {
    const [filterParams] = useSearchParams();
    const categories = arrayToLowerCase(filterParams.getAll("category"));
    const brands = arrayToLowerCase(filterParams.getAll("brand"));

    if (categories.length) {
        products = products.filter((product) =>
            categories.includes(product.category.toLowerCase() || '')
        );
    }

    if (brands.length) {
        products = products.filter((product) =>
            brands.includes(product.brand.toLowerCase() || '')
        );
    }

    return sortProducts(products, filterParams.get("sort")?.toLowerCase());
}
