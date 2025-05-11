"use client"

import { useState } from "react";
import { toast } from "react-toastify";
import { CircleUserRound } from "lucide-react";

import contactList from "@/consts/contacts.json"

export function ContactCard({ username, phone }: { username: string, phone: string }) {
    return (
        <article
            onClick={() => {
                navigator.clipboard.writeText(phone);
                if (toast.isActive(1)) return;
                toast.success('Phone number copied to clipboard', { toastId: 1 });
            }}
            className="bg-accent-interactive-hover/20 hover:bg-accent-interactive-hover/40 hover:cursor-pointer rounded-md aspect-square p-4 flex flex-col items-center justify-center gap-2">
            <CircleUserRound size={64} />
            <h2 className="text-lg font-bold">{username}</h2>
            <p className="text-text-muted">{phone}</p>
        </article>
    )
}

export default function Contacts() {
    contactList.sort((a, b) => a.username.localeCompare(b.username));
    const [contacts, setContacts] = useState<{ username: string, phone: string }[]>(contactList);

    const searchContacts = (query: string) => {
        setContacts(contactList.filter(contact => contact.username.toLowerCase().includes(query.toLowerCase())))
    }

    return (
        <div className="flex flex-col h-full">
            <header className="p-4">
                <input
                    onChange={(e) => searchContacts(e.target.value)}
                    className="bg-accent-interactive-hover/20 rounded-full px-4 py-2 w-full md:w-64"
                    type="text" placeholder="Search contacts..." />
            </header>
            <main className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 overflow-y-auto scrollbar-thin">
                {contacts.map((contact) => (
                    <ContactCard key={`contact-${contact.phone}`} username={contact.username} phone={contact.phone} />
                ))}
            </main>
        </div>
    )
}