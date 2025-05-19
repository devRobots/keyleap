"use client"

import { LogOut } from 'lucide-react'
import { useClerk } from "@clerk/nextjs";
import { useEffect, useState } from 'react';

export default function SignOutButton({ role, userId, username, imageUrl }: { role?: string, userId: string, username?: string, imageUrl?: string }) {
    const { signOut } = useClerk();
    const [startAnimation, setStartAnimation] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStartAnimation(true);
        }, 20000);

        return () => clearTimeout(timer);
    }, []);

    const logout = async () => {
        if (!role) {
            localStorage.setItem('KeyLeapUserId', userId);
            localStorage.setItem('KeyLeapUsername', username!);
            localStorage.setItem('KeyLeapImageUrl', imageUrl!);
            await fetch('/api/users', { method: 'POST' });
        }

        await signOut();
    };

    const animationClass = startAnimation ? 'animate-pulsing' : '';

    return (
        <button onClick={logout} title="Cierra sesión y conectate con otro usuario"
        style={{ "animation-iteration-count": "infinite" }}
        className={`bg-red-700 rounded-full size-8 flex items-center justify-center cursor-pointer ${animationClass}`}>
            <LogOut size={16} />
        </button>
    )
}
