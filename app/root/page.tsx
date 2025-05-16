import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import SignOutButton from "@/components/SignOutButton"

export default async function Root() {
    const { userId, orgRole } = await auth()
    if (!userId) redirect('/')
    if (orgRole !== "org:root") redirect('/home')

    return (
        <main className="flex flex-col h-full items-center justify-center gap-12 bg-black text-text-default font-mono">
            <h1 className="text-4xl">El principio del fin</h1>
            <p>Has llegado al final de la línea</p>
            <div className="flex gap-4 items-center">
                <a href="https://youtu.be/dQw4w9WgXcQ"
                    target="_blank" rel="noopener noreferrer"
                    className="bg-red-700 text-text-default px-4 py-2">
                    Eliminar sistema
                </a>
                <SignOutButton role={orgRole} userId={userId} />
            </div>
        </main>
    )
} 