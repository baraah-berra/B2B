import { useEffect, useState } from "react";
import ProductData from "./ProductData";
import ProductImages from "./ProductImages";
import "./ProductView.css";
import ProductViewTitle from "./ProductViewTitle";
import Container from "@components/Container";

export default function ProductView(props) {
    const [isSmallScreen, setIsSmallScreen] = useState(
        window.innerWidth <= 767
    );

    useEffect(() => {
        function handleResize() {
            setIsSmallScreen(window.innerWidth <= 767);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isSmallScreen]);

    return (
        <div className="product-view">
            <Container>
                {isSmallScreen && <ProductViewTitle {...props} />}
                <ProductImages product={props} isSmallScreen={isSmallScreen} />
                <ProductData
                    product={props}
                    titleComponent={
                        !isSmallScreen && <ProductViewTitle {...props} />
                    }
                />
            </Container>
        </div>
    );
}
