import Header from '@/components/Header'
import { SignInButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const { userId } = await auth()

  if (userId) redirect('/home')

  return (
    <main className="bg-background-primary text-text-default flex flex-col h-full items-center justify-center gap-8">
      <Header />
      <p className="text-text-muted">Encuentra la clave. Da el salto. Descubre el camino.</p>
      <div className="rounded-full bg-accent-interactive text-white font-medium px-6 py-2 hover:bg-accent-interactive-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-primary focus:ring-focus-ring transition-colors duration-150">
        <SignInButton withSignUp mode='modal'>
          Empieza ahora
        </SignInButton>
      </div>
    </main>
  );
}
