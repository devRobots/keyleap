"use client"

import { Headset } from "lucide-react";
import { useEffect, useState } from "react";

export default function Support() {
    const [animate, setAnimate] = useState("");

    useEffect(() => {
        const interval = setTimeout(() => {
            setAnimate("animate-bounce");
        }, 5000);
        return () => clearTimeout(interval);
    }, [])

    return (
        <button className={`support-button hover:animate-none ${animate}`}>
            <Headset /> Contact support
        </button>
    );
}