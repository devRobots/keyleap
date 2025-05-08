import { Send } from "lucide-react";
import BubbleMessage from "./BubbleMessage";

export default function SupportChat() {
    return (
        <div className="flex flex-col h-full">
            <main className="flex flex-col gap-2 h-full px-2 py-4 overflow-y-auto scrollbar-thin">
            <BubbleMessage message="Hello, how can I help you?" who="bot" />
            <BubbleMessage message="Hello, how can I help you?" who="user" />
            </main>
            <footer className="flex gap-2 p-2 bg-accent-interactive-hover/10">
                <textarea rows={1} draggable={false} placeholder="Type your message..." className="bg-accent-interactive-hover/40 rounded-full py-2 px-4 w-full h-fit"  />
                <button className="bg-accent-interactive-hover/40 rounded-full p-3"><Send size={16} /></button>
            </footer>
        </div>
    );
}