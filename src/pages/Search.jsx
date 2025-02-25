import { Navigate, useSearchParams } from "react-router-dom";
import ProductsList from "@ui/Products/ProductsList";
import SectionTitle from "@components/SectionTitle";
import useProducts from "@hooks/useProducts";
import useFilter from "@hooks/useFilter";

export default function Search() {
    const [searchParams] = useSearchParams();
    const name = searchParams.get("q");
    const products = useFilter(useProducts().searchProducts(name));

    return name ? (
        <ProductsList products={products}>
            <SectionTitle name="Search" description="All you searched for" />
        </ProductsList>
    ) : (
        <Navigate to="/" replace />
    );
}
