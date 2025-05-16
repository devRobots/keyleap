"use client"

import { useEffect, useState } from "react"
import { Folder, FolderLock, FolderTree } from "lucide-react"
import { useAdminStore } from "@/store/admin";

const folders = [
    "bin", "boot", "dev", "etc", "home", "lib", 
    "media", "mnt", "opt", "proc", "root", "run",
    "sbin", "srv", "sys", "tmp", "usr", "var"
]

const NUM_BROKEN_FOLDERS = 8;

const PAUSE_AT_END_MS = 600;
const PULSE_DURATION_MS = 400;
const PAUSE_BETWEEN_PULSES_MS = 150;

export default function Directories() {
    const adminStore = useAdminStore()

    const [debug, setDebug] = useState(false)
    const [started, setStarted] = useState(false)
    const [forbidden, setForbidden] = useState(true)
    const [activeFolder, setActiveFolder] = useState(-1)
    const [breadcrumbs, setBreadcrumbs] = useState<string[]>([])
    const [brokenFolders, setBrokenFolders] = useState<string[]>([])

    const shuffleArray = (array: string[]): string[] => {
        return [...array]
            .map(valor => ({ valor, claveOrden: Math.random() }))
            .sort((a, b) => a.claveOrden - b.claveOrden)
            .map(({ valor }) => valor);
    }


    const startFix = () => {
        setDebug(true)
        setBrokenFolders(shuffleArray(folders).slice(0, NUM_BROKEN_FOLDERS))
    }

    const fixFolder = (folder: string) => {
        setStarted(true)
        const initBug = brokenFolders[0]
        if (initBug === folder) {
            setBreadcrumbs([...breadcrumbs, initBug])

            const newBrokenFolders = [...brokenFolders]
            newBrokenFolders.shift()
            setBrokenFolders(newBrokenFolders)

            if (newBrokenFolders.length === 0) {
                setForbidden(false)
            }
        } else {
            setDebug(false)
            setStarted(false)
            setBreadcrumbs([])
            setBrokenFolders([])
        }
    }

    useEffect(() => {
        let animationTimer: NodeJS.Timeout;
    
        if (debug && brokenFolders.length > 0) {
            if (activeFolder >= brokenFolders.length) {
                setActiveFolder(0);
                return;
            }
    
            const isLastFolderInSequence = activeFolder === brokenFolders.length - 1;
            
            const timeUntilNextStep = PULSE_DURATION_MS + 
                (isLastFolderInSequence ? PAUSE_AT_END_MS : PAUSE_BETWEEN_PULSES_MS);
    
            animationTimer = setTimeout(() => {
                if (isLastFolderInSequence) {
                    setActiveFolder(0);
                } else {
                    setActiveFolder(prevIndex => (prevIndex === null ? 0 : prevIndex + 1));
                }
            }, timeUntilNextStep);
    
        } else {
            setActiveFolder(0);
        }
    
        return () => clearTimeout(animationTimer);
    
    }, [debug, brokenFolders, activeFolder]);   

    return (
        <section className="admin-container h-full flex flex-col font-mono">
            <div className="flex items-center p-2 bg-black/75">
                <button hidden={debug || !forbidden} onClick={startFix}
                    style={{ animationIterationCount: "infinite" }}
                    className="bg-amber-700 text-white px-2 py-1 mr-2 animate-tada cursor-pointer hover:animate-none hover:bg-amber-600">
                    Fix System
                </button>
                <FolderTree className="text-green-500 mr-2" />
                {breadcrumbs.map((folder, index) =>
                    <div key={`breadcrumb-${index}`} className="flex items-center">
                        <span className="text-green-500">/</span>
                        <span className="text-green-500">
                            {folder}
                        </span>

                    </div>
                )}
            </div>
            {forbidden ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 p-3.5 flex-grow overflow-y-auto">
                {folders.map((folderName) => {
                    const brokenFolderOrderIndex = brokenFolders.indexOf(folderName);
                    const isBroken = brokenFolderOrderIndex !== -1;

                    let folderBaseStyle = "p-3 rounded-lg flex items-center justify-center flex-row md:flex-col gap-1.5 shadow-lg transition-colors duration-150 ease-out md:min-h-[75px] text-center ";
                    let animationClassForSequence = "";

                    if (isBroken) {
                        folderBaseStyle += ` cursor-pointer ring-1 ring-green-600/50 text-green-400 bg-green-800 hover:bg-green-700/30 hover:ring-green-400 `;
                        
                        if (debug && !started && activeFolder === brokenFolderOrderIndex) {
                            animationClassForSequence = `animate-squeeze duration-${PULSE_DURATION_MS}`;
                        }
                    } else {
                        folderBaseStyle += ` text-green-300 bg-green-800/80 `;
                        if (debug) {
                            folderBaseStyle += ` opacity-50 cursor-not-allowed `;
                        } else {
                            folderBaseStyle += ` hover:bg-green-700/20 hover:scale-105 `;
                        }
                    }

                    return (
                        <div
                            key={folderName}
                            onClick={() => debug && isBroken && fixFolder(folderName)}
                            className={`${folderBaseStyle} ${animationClassForSequence}`}
                            title={isBroken ? `Fix ${folderName}` : folderName}
                        >
                            {isBroken ? <FolderLock size={22} /> : <Folder size={22} />}
                            <p className="text-xs truncate w-full pt-0.5">{folderName}</p>
                        </div>
                    );
                })}
            </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full gap-2 p-8">
                    <p className="text-green-500 text-2xl font-bold">System started up!</p>
                    <button onClick={adminStore.execTerminal} className="bg-green-500 text-white p-2 cursor-pointer hover:animate-none hover:bg-green-600">
                        INIT
                    </button>
                </div>
            )}

        </section>
    )
}