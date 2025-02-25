import Landing from "@ui/Landing";
import ProductsList from "@ui/Products/ProductsList";
import SectionTitle from "@components/SectionTitle";
import useProducts from "@hooks/useProducts";
import useFilter from "@hooks/useFilter";

export default function Home() {
    const products = useFilter(useProducts().products);

    return (
        <>
            <Landing />
            <ProductsList products={products}>
                <SectionTitle
                    name="Products"
                    description="Browser all of our products"
                />
            </ProductsList>
        </>
    );
}
