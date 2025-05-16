"use client"

import { useAdminStore } from "@/store/admin";

import Console from "@/components/admin/Console";
import Directories from "@/components/admin/Directories";

export default function AdminPanel() {
    const adminStore = useAdminStore()

    return (
        <main className="flex flex-col w-full gap-2">
            {adminStore.terminalStarted ? (
                <Console />
            ) : (
                <Directories />
            )}
        </main>
    )
}