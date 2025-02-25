export default function sortProducts(products, sort) {
    function sortBy(progressive, property) {
        if (progressive) {
            return products.toSorted((a, b) => +a[property] - +b[property]);
        }
        return products.toSorted((a, b) => +b[property] - +a[property]);
    }

    switch (sort) {
        case "alphabet":
            return products.toSorted((a, b) => a.title.localeCompare(b.title));

        case "reversed-alphabet":
            return products.toSorted((a, b) => b.title.localeCompare(a.title));

        case "high-rating":
            return sortBy(false, "rating");

        case "low-rating":
            return sortBy(true, "rating");

        case "high-price":
            return sortBy(false, "price");

        case "low-price":
            return sortBy(true, "price");

        default:
            return products;
    }
}
