import services from '@/data/services'
import { redirect } from 'next/navigation'
import { auth, currentUser } from '@clerk/nextjs/server'

import Header from '@/components/Header'
import Modals from '@/components/home/Modals'
import ProfileBadge from '@/components/ProfileBadge'
import SignOutButton from '@/components/SignOutButton'
import ServiceCard from '@/components/home/ServiceCard'
import SupportButton from '@/components/support/SupportButton'

export default async function HomeScreen() {
    const { userId, orgRole } = await auth()
    if (!userId) redirect('/')
    if (orgRole === "org:admin") redirect('/admin')
    if (orgRole === "org:root") redirect('/root')
    const user = await currentUser()
    const username = user!.username || user!.fullName!
    const imageUrl = user!.imageUrl

    return (
        <main className="flex flex-col h-full items-center justify-center gap-12 bg-background-primary text-text-default">
            <Header />
            <div className="flex font-mono items-center gap-2">
                Bienvenido
                <ProfileBadge username={username} imageUrl={imageUrl} />
                <SignOutButton role={orgRole} userId={userId} />
            </div>
            <section className='grid grid-cols-2 md:grid-cols-4 gap-4 w-fit'>
                {services.map((item) => (
                    <ServiceCard key={item.id} id={item.id} title={item.name} disabled={!orgRole}>
                        <item.icon size={32} />
                    </ServiceCard>
                ))}
            </section>
            {!orgRole && <SupportButton />}
            <Modals role={orgRole} />
        </main>
    );
}
