"use client"

import { Headset } from "lucide-react";
import { useModalStore } from "@/store/modals";

export default function SupportButton() {
    const { openModal } = useModalStore();
    
    return (
        <>
            <button onClick={() => openModal('CHATBOT_MODAL')} className="support-button">
                <Headset /> Contactar soporte
            </button>
        </>
    );
}