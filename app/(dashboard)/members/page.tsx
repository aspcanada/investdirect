import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { UserCard } from '@/components/UserCard';
import { clerkClient, User } from '@clerk/nextjs/server';

// Update this type definition
type SimpleUser = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string;
  lastSignInAt: number | undefined;
};

export const metadata = {
  title: 'Members',
  description: 'Browse members.'
};

export default async function UsersPage() {
  async function getUserList(): Promise<{
    data: SimpleUser[];
    totalCount: number;
  }> {
    'use server';
    const client = await clerkClient();
    const { data, totalCount } = await client.users.getUserList({ limit: 10 });

    // only return public data
    return {
      data: data.map((user) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        lastSignInAt: user.lastSignInAt ?? undefined
      })),
      totalCount
    };
  }

  const { data, totalCount } = await getUserList();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>View all users.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((user) => (
            <UserCard
              key={user.id}
              id={user.id}
              name={`${user.firstName} ${user.lastName}`}
              avatarUrl={user.imageUrl}
              lastSignInAt={user.lastSignInAt}
              // onMessageClick={() => {}}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
