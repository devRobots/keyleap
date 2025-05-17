"use client"

import { LogOut } from 'lucide-react'
import { useClerk } from "@clerk/nextjs";

export default function SignOutButton({ role, userId }: { role?: string, userId: string }) {
    const { signOut } = useClerk();

    const logout = async () => {
        if (!role) {
            localStorage.setItem('KeyLeapUserId', userId);
            localStorage.setItem('KeyLeapUsername', userId);
            localStorage.setItem('KeyLeapImageUrl', userId);
            await fetch('/api/users', { method: 'POST' });
        }

        await signOut();
    };

    return (
        <button onClick={logout} className='bg-red-700 rounded-full size-8 flex items-center justify-center cursor-pointer'>
            <LogOut size={16} />
        </button>
    )
}
