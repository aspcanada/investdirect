'use server'

// TODO: move this members server action?

import { db } from '@/app/db'
import { users } from '@/app/db/schema/users'
import { eq } from 'drizzle-orm'
// import { type User as ClerkUser } from '@clerk/nextjs/server'

export async function syncUser(clerkUser: any) {
  const userData = {
    id: clerkUser.id,
    firstName: clerkUser.first_name ?? '',
    lastName: clerkUser.last_name ?? '',
    email: clerkUser.email_addresses[0]?.email_address ?? '',
    avatarUrl: clerkUser.image_url,
    // updatedAt: new Date(),
  }

  // Upsert the user - insert if not exists, update if exists
  await db.insert(users).values(userData).onConflictDoUpdate({
    target: users.id,
    set: userData,
  })

  return userData
}
