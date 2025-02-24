'use server';

import { clerkClient } from '@clerk/nextjs/server';

// Update this type definition
type SimpleUser = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string;
  lastSignInAt: number | undefined;
};

export async function getUser(userId: string) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  return {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    avatarUrl: user.imageUrl,
    lastSignInAt: user.lastSignInAt ?? undefined
  };
}

export async function getUsers(): Promise<{
  users: SimpleUser[];
  totalCount: number;
}> {
  const client = await clerkClient();
  const { data, totalCount } = await client.users.getUserList({ limit: 10 });

  // only return public data
  return {
    users: data.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      lastSignInAt: user.lastSignInAt ?? undefined
    })),
    totalCount
  };
}
