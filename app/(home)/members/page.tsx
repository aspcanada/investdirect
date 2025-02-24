import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { UserCard } from '@/components/UserCard';
import { getUsers } from './actions';

export const metadata = {
  title: 'Members',
  description: 'Browse members.'
};

export default async function UsersPage() {
  const { users, totalCount } = await getUsers();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>View all users.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
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
