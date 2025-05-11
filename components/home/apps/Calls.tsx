"use client"

import { Phone, CircleUser, Delete, X, Clipboard } from "lucide-react"
import { useState } from "react"

export default function Calls() {
    const [phone, setPhone] = useState('')
    return (
        <div className="flex flex-col md:flex-row h-full w-full overflow-y-scroll md:overflow-y-auto md:items-center md:justify-evenly">
            <aside className="flex flex-col items-center justify-between gap-8 bg-accent-interactive-hover/20 p-6 m-4 rounded-md w-fit">
                <CircleUser size={100} />
                <input className="bg-accent-interactive-hover rounded-full px-4 py-2 w-full md:w-64 text-center text-4xl" type="text" placeholder="---------" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <div className="flex justify-around w-full">
                    <button className="clear-button">
                        <X />
                    </button>
                    <button className="call-button">
                        <Phone />
                    </button>
                    <button className="bg-accent-interactive-hover/30 hover:bg-accent-interactive-hover/40 rounded-full size-16 p-3 flex items-center justify-center cursor-pointer">
                        <Clipboard />
                    </button>
                </div>
            </aside>
            <main className="grid grid-cols-3 gap-2 py-4 px-8 md:px-4 items-center justify-center md:h-fit w-full md:w-fit">
                <button className="phone-number-button" onClick={() => setPhone(phone + '1')}>1</button>
                <button className="phone-number-button" onClick={() => setPhone(phone + '2')}>2</button>
                <button className="phone-number-button" onClick={() => setPhone(phone + '3')}>3</button>
                <button className="phone-number-button" onClick={() => setPhone(phone + '4')}>4</button>
                <button className="phone-number-button" onClick={() => setPhone(phone + '5')}>5</button>
                <button className="phone-number-button" onClick={() => setPhone(phone + '6')}>6</button>
                <button className="phone-number-button" onClick={() => setPhone(phone + '7')}>7</button>
                <button className="phone-number-button" onClick={() => setPhone(phone + '8')}>8</button>
                <button className="phone-number-button" onClick={() => setPhone(phone + '9')}>9</button>
                <button className="phone-number-button" onClick={() => setPhone(phone.slice(0, -1))}><Delete /></button>
                <button className="phone-number-button" onClick={() => setPhone(phone + '0')}>0</button>
            </main>
        </div>
    )
}