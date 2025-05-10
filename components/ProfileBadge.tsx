import { currentUser } from '@clerk/nextjs/server'

export default async function ProfileBadge() {
    const user = await currentUser()
    if (!user) return null
    const imageUrl = user?.imageUrl
    const name = user?.fullName

    return (
        <div className="flex items-center select-none">
            <div className="size-8 rounded-full overflow-hidden z-10">
                <img
                    src={imageUrl}
                    alt={`${name}'s avatar`}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="bg-gray-800 text-white rounded-full pl-10 pr-4 py-1 -ml-8 flex items-center relative z-0">
                <span>{user?.username}</span>
            </div>
        </div>
    );
}