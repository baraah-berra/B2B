import ProductHome from "@ui/Product/ProductHome";
import "./ProductsList.css";
import NoProducts from "@ui/Products/NoProducts";
import { useState } from "react";
import Filters from "./Filters";
import Container from "@components/Container";

export default function ProductsList({ products, children }) {
    const [productsLimit, setProductsLimit] = useState(30);
    const productsLength = products.length;

    return (
        <div className="products" id="products">
            {children}
            <Container>
                <Filters />
                <div className="products-container">
                    {!productsLength ? (
                        <NoProducts />
                    ) : (
                        products.map(
                            (data, index) =>
                                index < productsLimit && (
                                    <ProductHome key={data.id} {...data} />
                                )
                        )
                    )}
                    {productsLimit < products.length && (
                        <div className="limit">
                            <button
                                onClick={() =>
                                    setProductsLimit(productsLimit + 30)
                                }
                            >
                                <i className="fa-solid fa-plus"></i>
                            </button>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}
