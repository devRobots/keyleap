"use client"

import { Send, Loader } from "lucide-react";
import { useEffect, useState } from "react";

import { ChatMessage } from "@/types/chat";
import { fetchChat, pushMessage } from "@/lib/support";
import BubbleMessage from "@/components/support/BubbleMessage";

export default function SupportChat() {
    const [loading, setLoading] = useState(true);
    const [writing, setWriting] = useState(false);
    const [finished, setFinished] = useState(false);

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    useEffect(() => {
        async function loadChat() {
            const chat = await fetchChat();
            setMessages(chat?.messages || []);
            setFinished(chat?.goalAchieved || false);
            setLoading(false);
        }
        loadChat();
    }, []);

    const sendMessage = async () => {
        if (!message.trim()) return;
        const tmpMessages: ChatMessage[] = [...messages, { role: 'user', content: message }];
        setMessages(tmpMessages);
        setWriting(true);
        setMessage('');
        const chat = await pushMessage(message);
        setMessages(chat?.messages || tmpMessages);
        setFinished(chat?.goalAchieved || false);
        setWriting(false);
    };

    return (
        <div className="flex flex-col h-full">
            <main className="flex flex-col gap-2 h-full px-2 py-4 overflow-y-auto scrollbar-thin">
                {loading && <Loader size={20} className="w-full mt-28 animate-spin" />}
                {!loading && !messages.length && <p className="border border-accent-interactive p-2 rounded bg-accent-interactive/20 text-balance text-center">
                    Este es un servicio de chatbot creado usando <a href="https://gandalf.lakera.ai/baseline" target="_blank" className="text-accent-interactive font-bold">Gandalf</a>. Por favor, rogamos no intentar extraer información sensible.
                </p>}
                {!loading && messages.map((message, index) => (
                    <BubbleMessage key={`msg-${index}`} role={message.role} content={message.content} />
                ))}
            </main>
            <footer className="flex gap-2 p-2 bg-accent-interactive-hover/10">
                {
                    !finished ? (
                        <>
                            <textarea onInput={(e) => setMessage(e.currentTarget.value)} disabled={writing} rows={1} draggable={false} placeholder="Type your message..." className="bg-accent-interactive-hover/40 rounded-full py-2 px-4 w-full h-fit" value={message} onChange={(e) => setMessage(e.target.value)} />
                            <button onClick={sendMessage} disabled={writing} className="bg-accent-interactive-hover/40 rounded-full p-3"><Send size={16} /></button>
                        </>
                    ) : (
                        <p className="text-text-muted text-center w-full">Chat finalizado</p>
                    )
                }
            </footer>
        </div>
    );
}