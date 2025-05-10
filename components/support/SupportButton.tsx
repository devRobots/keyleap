"use client"

import { useState } from "react";
import { Headset } from "lucide-react";

import Modal from "@/components/Modal";
import SupportChat from "@/components/support/SupportChat";

export default function SupportButton() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button onClick={() => setOpen(true)} className="support-button">
                <Headset /> Contact support
            </button>
            <Modal title="Support Chat" show={open} toggle={() => setOpen(!open)}>
                <SupportChat />
            </Modal>
        </>
    );
}