import "./SectionTitle.css";

export default function SectionTitle({ name, description }) {
    return (
        <div className="section-title important">
            <h2>{name}</h2>
            <p>{description}</p>
        </div>
    );
}
