import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { UserCard } from '@/components/UserCard'
import { getUsers } from './actions'

export const metadata = {
  title: 'Members | InvestDirect Community',
  description:
    'Connect with real estate investors and lenders in our trusted network.',
}

export default async function MembersPage() {
  const { users, totalCount } = await getUsers()

  return (
    <>
      <h3 className="font-semibold">Members</h3>
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
    </>
  )
}
