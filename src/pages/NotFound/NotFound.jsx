import ButtonLink from "@components/ButtonLink";
import "./NotFound.css";

export default function NotFound() {
    return (
        <div className="not-found">
            <h1 className="important">404</h1>
            <p>
                Sorry, We could not find this page.
                <br />
                Try checking the URL again.
            </p>
            <ButtonLink url="/">Return Home</ButtonLink>
        </div>
    );
}
