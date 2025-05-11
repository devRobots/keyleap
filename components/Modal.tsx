"use client"

import { X } from "lucide-react"
import { useModalStore } from "@/store/modals";

export default function Modal({ id, title, children }: { id: string; title: string; children: React.ReactNode; }) {
    const { activeModal, closeModal } = useModalStore();

    return (
        <div onClick={closeModal} className={`modal-backdrop ${activeModal === id ? "block opacity-100" : "hidden opacity-0"}`}>
                <div onClick={(e) => e.stopPropagation()} className="modal-content">
                    <header className="flex justify-between p-4 shadow-lg bg-accent-interactive-hover/10">
                        <h2 className="text-2xl font-bold">{title}</h2>
                        <button onClick={closeModal}><X size={20} /></button>
                    </header>
                    <main className="h-96">
                        {children}
                    </main>
                </div>
        </div>
    );
}