import { ChatMessage } from "@/types/chat";

export default function BubbleMessage({ role, content }: ChatMessage) {
    return (
        <div className={`bubble-message ${role === "user" ? "self-end ml-6 bg-accent-interactive" : "mr-6 bg-accent-interactive/30"}`}>
            <p className="text-pretty w-fit">{role === "assistant" && <strong>Locky:</strong>} {content}</p>
        </div>
    );
}