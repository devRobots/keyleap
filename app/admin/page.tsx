import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserCount } from "@/services/users";

import Image from "next/image";
import Header from "@/components/Header";
import Background from "@/components/admin/Background";
import SignOutButton from "@/components/SignOutButton";
import AdminPanel from "@/components/admin/AdminPanel";

export default async function Admin() {
    const { userId, orgRole } = await auth()
    if (!userId) redirect('/')
    if (orgRole !== "org:admin") redirect('/home')

    const userCount = await getUserCount()

    return (
        <>
            <Background />
            <main className="flex flex-col md:flex-row h-full text-text-default p-2 gap-2">
                <aside className="flex flex-col w-full md:w-fit gap-2">
                    <section className="admin-container p-4">
                        <Header />
                    </section>
                    <section className="admin-container flex font-mono items-center justify-center gap-2 p-2">
                        Bienvenido de nuevo admin
                        <SignOutButton role={orgRole!} userId={userId!} />
                    </section>
                    <div className="hidden md:flex flex-col h-full gap-2 justify-end">
                        <section className="admin-container flex gap-2 overflow-hidden">
                            <Image
                                className="w-full object-cover object-bottom aspect-[5/4]"
                                src="/images/threat-map.gif"
                                unoptimized alt="Threat map"
                                width={128} height={128} />
                        </section>
                    </div>
                    <section className="flex gap-2 font-mono">
                        <article className="admin-container w-full p-2 flex items-center justify-center">
                            Threats: 946
                        </article>
                        <article className="admin-container w-full p-2 flex items-center justify-center">
                            Users: {userCount}
                        </article>
                    </section>
                </aside>
                <AdminPanel />
                <pre className="admin-container w-full md:w-fit h-fit md:hidden lg:block p-4 font-mono text-green-600 text-[10px] md:text-xs">
                    <p className="drop-shadow-[0px_0px_5px_rgba(0,255,0,0.7)]">[0.000000] Kernel command line: /boot/vmlinuz-5.4.0-77</p>
                    <p className="drop-shadow-[0px_0px_5px_rgba(0,255,0,0.7)]">[0.123456] smp: Bringing up secondary CPUs...</p>
                    <p className="drop-shadow-[0px_0px_5px_rgba(0,255,0,0.7)]">[0.567890] ACPI: Core Revision 20210105</p>
                    <p className="drop-shadow-[0px_0px_5px_rgba(0,255,0,0.7)]">[1.123456] PCI: System Core Logic Chipset mapping failed</p>
                    <p className="drop-shadow-[0px_0px_5px_rgba(0,255,0,0.7)]">[2.345678] memory: Reserving KASLR memory</p>
                    <p className="drop-shadow-[0px_0px_5px_rgba(0,255,0,0.7)]">[ERROR_KERNEL_INTEGRITY_FAIL] --- KERNEL PANIC ---</p>
                    <p className="drop-shadow-[0px_0px_5px_rgba(0,255,0,0.7)]">[CRITICAL] Dumping stack trace...</p>
                    <p className="drop-shadow-[0px_0px_5px_rgba(0,255,0,0.7)]">[CRITICAL] Corrupted data segment found at 0xDEADBEEF</p>
                    <p className="drop-shadow-[0px_0px_5px_rgba(0,255,0,0.7)]">[INFO] Attempting to reboot system...</p>
                    <p className="drop-shadow-[0px_0px_5px_rgba(0,255,0,0.7)]">[INFO] System log truncated. Further data unrecoverable.</p>
                    <p className="drop-shadow-[0px_0px_5px_rgba(0,255,0,0.7)]">[2.123456] smp: Bringing up secondary CPUs...</p>
                    <p className="drop-shadow-[0px_0px_5px_rgba(0,255,0,0.7)]">[2.567890] ACPI: Core Revision 20210105</p>
                    <p className="drop-shadow-[0px_0px_5px_rgba(0,255,0,0.7)]">[3.123456] PCI: System Core Logic Chipset mapping failed</p>
                    <p className="drop-shadow-[0px_0px_5px_rgba(0,255,0,0.7)]">[4.345678] memory: Reserving KASLR memory</p>
                    <p className="drop-shadow-[0px_0px_5px_rgba(0,255,0,0.7)]">[CRITICAL] Dumping stack trace...</p>
                    <p className="drop-shadow-[0px_0px_5px_rgba(0,255,0,0.7)]">[CRITICAL] Corrupted data segment found at 0xDEADBEEF</p>
                    <p className="drop-shadow-[0px_0px_5px_rgba(0,255,0,0.7)]">[INFO] Attempting to reboot system...</p>
                    <p className="drop-shadow-[0px_0px_5px_rgba(0,255,0,0.7)]">[INFO] System log truncated. Further data unrecoverable.</p>
                </pre>
            </main>
        </>
    );
}