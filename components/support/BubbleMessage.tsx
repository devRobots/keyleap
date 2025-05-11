import React from "react";
import { ChatMessage } from "@/types/chat";

const TARGET_WORD = process.env.NEXT_PUBLIC_SUPPORT_PASSWORD || "";
const HIGHLIGHT_CLASS = "font-bold text-yellow-300 cursor-zoom-in";

export default function BubbleMessage({ role, content }: ChatMessage) {
    const renderContent = (role: string) => {
        if (role === "user") return content
        if (content.includes(TARGET_WORD)) {
            const parts = content.split(TARGET_WORD);
            return (
                <>
                    {parts.map((part, index) => (
                        <React.Fragment key={index}>
                            {part}
                            {index < parts.length - 1 && (
                                <span className={HIGHLIGHT_CLASS}>{TARGET_WORD}</span>
                            )}
                        </React.Fragment>
                    ))}
                </>
            );
        } else {
            return content;
        }
    };


    return (
        <div className={`bubble-message ${role === "user" ? "self-end ml-6 bg-accent-interactive" : "mr-6 bg-accent-interactive/30"}`}>
            <p className="text-pretty w-fit">{role === "assistant" && <strong>Locky:</strong>} {renderContent(role)}</p>
        </div>
    );
}