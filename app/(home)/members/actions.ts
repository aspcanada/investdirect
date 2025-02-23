import { clerkClient } from '@clerk/nextjs/server';



export async function getUser(userId: string) {
    'use server';
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    return {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      avatarUrl: user.imageUrl,
      lastSignInAt: user.lastSignInAt ?? undefined
    };
  }