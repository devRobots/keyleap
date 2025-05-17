"use client"

import ProfileBadge from "@/components/ProfileBadge"

export default function Congrats() {
    const username = localStorage.getItem('KeyLeapUsername')
    const imageUrl = localStorage.getItem('KeyLeapImageUrl')
    
    return (
        <h2 className="text-2xl flex items-center gap-2">
            Felicidades <ProfileBadge username={username!} imageUrl={imageUrl!} /> ahora eres root
        </h2>
    )
}
