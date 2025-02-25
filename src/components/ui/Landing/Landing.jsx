import ButtonLink from "@components/ButtonLink";
import "./Landing.css";
import Container from "@components/Container";
import Overlay from "@components/Overlay";

export default function Landing() {
    return (
        <div className="landing">
            <Overlay />
            <Container>
                <h2>
                    Shop the latest products at{" "}
                    <span className="important">B2B</span>!
                </h2>
                <p>
                    We have everything you need to look and feel your best, at
                    unbeatable prices.
                </p>
                <ButtonLink url="#products">Browse Products</ButtonLink>
            </Container>
        </div>
    );
}
