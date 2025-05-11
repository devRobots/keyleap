import { auth } from "@clerk/nextjs/server";
import Background from "@/components/admin/Background";
import Header from "@/components/Header";
import SignOutButton from "@/components/SignOutButton";
import { redirect } from "next/navigation";

export default async function Admin() {
    const { userId, orgRole } = await auth()
    if (!userId) redirect('/')
    if (orgRole !== "org:admin") redirect('/home')

    return (
        <>
            <Background />
            <main className="flex flex-col h-full items-center justify-center gap-12 text-text-default">
                <Header />
                <div className="flex font-mono items-center gap-2">
                    Welcome <span className="font-bold">admin</span>
                    <SignOutButton role={orgRole!} userId={userId!} />
                </div>
            </main>
        </>
    );
}