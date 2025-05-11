"use client"

import contactList from "@/consts/contacts.json"

import { useRef, useState } from "react"
import { Phone, PhoneOff, CircleUser, Delete, X, Clipboard } from "lucide-react"
import useSound from "use-sound";

const RINGING_SOUND_SRC = '/sounds/ringing.mp3';
const TALKING_SOUND_SRC = '/sounds/talking.mp3';
const HANGUP_SOUND_SRC = '/sounds/hangup.mp3';

export default function Calls() {
    const [phone, setPhone] = useState('');
    const [calling, setCalling] = useState(false);

    const ringTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [playRinging, { stop: stopRinging, sound: ringingSoundInstance }] = useSound(
        RINGING_SOUND_SRC
    );

    const [playHangup, { stop: stopHangup, sound: hangupSoundInstance }] = useSound(
        HANGUP_SOUND_SRC, { volume: 0.30 }
    );

    const [playTalking, { stop: stopTalking, sound: talkingSoundInstance }] = useSound(
        TALKING_SOUND_SRC, { volume: 0.20 }
    );

    const stopAllSoundsAndTimers = () => {
        if (ringTimeoutRef.current) {
            clearTimeout(ringTimeoutRef.current);
            ringTimeoutRef.current = null;
        }
        if (ringingSoundInstance && ringingSoundInstance.playing()) {
            stopRinging();
        }
        if (talkingSoundInstance && talkingSoundInstance.playing()) {
            stopTalking();
        }
        if (hangupSoundInstance && hangupSoundInstance.playing()) {
            stopHangup();
        }
    };

    const handleInitiateCallSequence = () => {
        stopAllSoundsAndTimers();
        playRinging();

        ringTimeoutRef.current = setTimeout(() => {
            stopRinging();
            playTalking();
        }, 5000);
        ringTimeoutRef.current = setTimeout(() => {
            stopTalking();
            playHangup();
        }, 18500);
        ringTimeoutRef.current = setTimeout(() => {
            endCall();
        }, 19500);
    };

    const pasteFromClipboard = () => {
        navigator.clipboard.readText().then((text) => {
            setPhone(text.replace(/[^0-9]/g, '').slice(0, 7))
        })
    };

    const addNumber = (number: string) => {
        if (phone.length >= 7) return;
        setPhone(phone + number)
    };

    const removeNumber = () => setPhone(phone.slice(0, -1));

    const call = () => {
        if (phone.length < 7) return;
        const contact = contactList.find((contact) => contact.username === "Guardy");
        if (phone !== contact?.phone) return;
        setCalling(true);
        handleInitiateCallSequence();
    };

    const endCall = () => {
        setCalling(false);
        stopAllSoundsAndTimers();
        setPhone('');
    };

    return (
        <div className="flex flex-col md:flex-row h-full w-full overflow-y-scroll md:overflow-y-auto md:items-center md:justify-evenly">
            <aside className="flex flex-col items-center justify-between gap-8 bg-accent-interactive-hover/20 p-6 m-4 rounded-md w-fit transition-all">
                <CircleUser size={100} />
                <input
                    className="bg-accent-interactive-hover rounded-full px-4 py-2 w-full md:w-64 text-center text-4xl"
                    type="tel" placeholder="---------" maxLength={7} disabled={calling}
                    value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))} />
                <div className="flex justify-around w-full">
                    <button hidden={calling} onClick={() => setPhone('')} className="clear-button">
                        <X />
                    </button>
                    <button hidden={calling} onClick={call} className="call-button">
                        <Phone />
                    </button>
                    <button hidden={calling} className="copy-button" onClick={pasteFromClipboard}>
                        <Clipboard />
                    </button>
                    <button hidden={!calling} onClick={endCall} className="finish-call-button">
                        <PhoneOff />
                    </button>
                </div>
            </aside>
            <main hidden={calling} className="grid grid-cols-3 gap-2 py-4 px-8 md:px-4 items-center justify-center md:h-fit w-full md:w-fit transition-all">
                <button className="phone-number-button" onClick={() => addNumber('1')}>1</button>
                <button className="phone-number-button" onClick={() => addNumber('2')}>2</button>
                <button className="phone-number-button" onClick={() => addNumber('3')}>3</button>
                <button className="phone-number-button" onClick={() => addNumber('4')}>4</button>
                <button className="phone-number-button" onClick={() => addNumber('5')}>5</button>
                <button className="phone-number-button" onClick={() => addNumber('6')}>6</button>
                <button className="phone-number-button" onClick={() => addNumber('7')}>7</button>
                <button className="phone-number-button" onClick={() => addNumber('8')}>8</button>
                <button className="phone-number-button" onClick={() => addNumber('9')}>9</button>
                <button className="phone-number-button" onClick={removeNumber}><Delete /></button>
                <button className="phone-number-button" onClick={() => addNumber('0')}>0</button>
            </main>
        </div>
    )
}