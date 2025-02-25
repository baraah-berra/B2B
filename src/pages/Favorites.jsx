import ProductsList from "@ui/Products/ProductsList";
import SectionTitle from "@components/SectionTitle";
import useFavorites from "@hooks/useFavorites";
import useFilter from "@hooks/useFilter";

export default function Favorites() {
    const favorites = useFilter(useFavorites().favorites);

    return (
        <ProductsList products={favorites}>
            <SectionTitle
                name="Favorites"
                description="Browser all of your favorites"
            />
        </ProductsList>
    );
}
