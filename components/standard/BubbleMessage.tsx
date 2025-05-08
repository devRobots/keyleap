export default function BubbleMessage({ message, who }: { message: string; who?: "user" | "bot" }) {
    return (
        <div className={`bubble-message w-fit ${who === "user" ? "self-end" : ""}`}>
            {who === "bot" && <strong>Guardy:</strong>}
            <p>{message}</p>
        </div>
    );
}