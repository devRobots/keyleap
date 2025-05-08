"use client"

import { Headset } from "lucide-react";
import { useState } from "react";
import Modal from "../Modal";
import SupportChat from "./SupportChat";

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