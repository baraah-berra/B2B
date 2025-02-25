import "./ProductsCart.css";
import Total from "./Total";
import ProductCart from "@ui/Product/ProductCart";
import NoProducts from "@ui/Products/NoProducts";
import useCart from "@hooks/useCart";
import Container from "@components/Container";

export default function ProductsCart({ children }) {
    const { cart } = useCart();

    return (
        <div className={"products-cart"}>
            {children}
            <Container>
                {!cart.length ? (
                    <NoProducts />
                ) : (
                    <>
                        {cart.map((data) => (
                            <ProductCart key={data.id} {...data} />
                        ))}
                        <Total />
                    </>
                )}
            </Container>
        </div>
    );
}
