import Header from '@/components/Header'
import SupportButton from '@/components/support/SupportButton'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { SignOutButton } from '@clerk/nextjs'
import { BookUser, LockKeyhole, LogOut } from 'lucide-react'
import ServiceCard from '@/components/home/ServiceCard'
import services from '@/consts/services'
import ProfileBadge from '@/components/ProfileBadge'

export default async function HomeScreen() {
    const { userId } = await auth()
    if (!userId) redirect('/')

    return (
        <main className="flex flex-col h-full items-center justify-center gap-12 bg-background-primary text-text-default">
            <Header />
            <div className="flex font-mono items-center gap-2">
                Welcome
                <ProfileBadge />
                <div className='bg-red-700 rounded-full size-8 flex items-center justify-center cursor-pointer'>
                    <SignOutButton>
                        <LogOut size={16} />
                    </SignOutButton>
                </div>
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
            <SupportButton />
        </main>
    );
}
