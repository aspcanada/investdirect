import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import { createUserMessage, deleteUserMessage } from './actions';
import { db } from 'app/db';
import { auth } from '@clerk/nextjs/server';

export default async function HomePage() {
  const { userId } = await auth();
  if (!userId) throw new Error('User not found');
  const existingMessage = await db.query.UserMessages.findFirst({
    where: (messages, { eq }) => eq(messages.user_id, userId)
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Home</CardTitle>
        <CardDescription>Dashboard cards here.</CardDescription>
      </CardHeader>
      <CardContent>
        {existingMessage ? (
          <div>
            <p>{existingMessage.message}</p>
            <form action={deleteUserMessage}>
              <button>Delete Message</button>
            </form>
          </div>
        ) : (
          <form action={createUserMessage}>
            <input type="text" name="message" placeholder="Enter a message" />
            <button>Save Message</button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
