import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { createUser } from '@/services/users';

export async function POST(request: NextRequest): Promise<NextResponse> {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await currentUser();
    await createUser(userId, user!.username || user!.fullName!, user!.imageUrl);

    return NextResponse.json({ userId }, { status: 200 });
}
