import Thumbnail from "@ui/Product/Thumbnail";
import "./ProductImages.css";
import { useCallback, useEffect, useRef, useState } from "react";
import ProductImg from "./ProductImg";

export default function ProductImages({ product, isSmallScreen }) {
    const { images, thumbnail } = product;

    if (!images.includes(thumbnail)) {
        images.push(thumbnail);
    }

    const [active, setActive] = useState(-1);
    const currentThumbnail = images.at(active);
    const swipeRef = useRef();

    const update = useCallback(
        (direction) => {
            if (direction == "swiped-left") {
                return setActive((old) =>
                    old + 1 >= images.length ? 0 : old + 1
                );
            }
            setActive((old) => (old - 1 <= images.length * -1 ? -1 : old - 1));
        },
        [images.length]
    );

    useEffect(() => {
        const current = swipeRef.current;
        function handleSwipe(e) {
            update(e.type);
        }
        current?.addEventListener("swiped-left", handleSwipe);
        current?.addEventListener("swiped-right", handleSwipe);
        return () => {
            current?.removeEventListener("swiped-left", handleSwipe);
            current?.removeEventListener("swiped-right", handleSwipe);
        };
    }, [update]);

    return (
        <div className="product-images">
            <div className="holder">
                <ProductImg
                    isSmallScreen={isSmallScreen}
                    currentThumbnail={currentThumbnail}
                    value={thumbnail}
                    onClick={() => setActive(images.indexOf(thumbnail))}
                />
                {images.map(
                    (value, index) =>
                        value !== thumbnail && (
                            <ProductImg
                                isSmallScreen={isSmallScreen}
                                currentThumbnail={currentThumbnail}
                                value={value}
                                onClick={() => setActive(index)}
                                key={index}
                            />
                        )
                )}
            </div>
            <Thumbnail
                product={product}
                thumbnail={images.at(active)}
                swipeRef={swipeRef}
            />
        </div>
    );
}
