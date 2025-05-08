import { X } from "lucide-react"

export default function Modal({ title, children, show, toggle }: { title: string; children: React.ReactNode; show: boolean; toggle: () => void }) {
    return (
        <div onClick={toggle} className={`modal-backdrop ${show ? "block opacity-100" : "hidden opacity-0"}`}>
                <div onClick={(e) => e.stopPropagation()} className="modal-content">
                    <header className="flex justify-between p-4 shadow-lg bg-accent-interactive-hover/10">
                        <h2 className="text-2xl font-bold">{title}</h2>
                        <button onClick={toggle}><X size={20} /></button>
                    </header>
                    <main className="h-96">
                        {children}
                    </main>
                </div>
        </div>
    );
}