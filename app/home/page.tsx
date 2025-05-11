import Header from '@/components/Header'
import SupportButton from '@/components/support/SupportButton'
import { redirect } from 'next/navigation'
import { auth, currentUser } from '@clerk/nextjs/server'
import { BookUser, LockKeyhole } from 'lucide-react'
import ServiceCard from '@/components/home/ServiceCard'
import services from '@/consts/services'
import ProfileBadge from '@/components/ProfileBadge'
import SignOutButton from '@/components/SignOutButton'

export default async function HomeScreen() {
    const { userId, orgRole } = await auth()
    if (!userId) redirect('/')
    const user = await currentUser()
    const username = user!.username || user!.fullName!
    const imageUrl = user!.imageUrl

    return (
        <main className="flex flex-col h-full items-center justify-center gap-12 bg-background-primary text-text-default">
            <Header />
            <div className="flex font-mono items-center gap-2">
                Welcome
                <ProfileBadge username={username} imageUrl={imageUrl} />
                <SignOutButton role={orgRole} userId={userId} />
            </div>
            <section className='grid grid-cols-2 md:grid-cols-4 gap-4 w-fit'>
                {services.map((item, index) => (
                    <ServiceCard key={index} title={item}>
                        {index === 0 && <BookUser size={32} />}
                        {index === 1 && <LockKeyhole size={32} />}
                        {index === 2 && <BookUser size={32} />}
                        {index === 3 && <BookUser size={32} />}
                    </ServiceCard>
                ))}
            </section>
            {!orgRole && <SupportButton />}
        </main>
    );
}
