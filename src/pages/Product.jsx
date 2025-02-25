import { Navigate, useParams } from "react-router-dom";
import ProductView from "@ui/Product/ProductView";
import useProducts from "@hooks/useProducts";

export default function Product() {
    const { id } = useParams();
    const product = useProducts().getProduct(id);

    if (!product) return <Navigate to="/404" replace />;
    return <ProductView {...product} />;
}
