import { auth } from '@clerk/nextjs/server'
import { ChatList } from './_components/chat-list'
import { getUser } from '../members/actions'
import { db } from '@/app/db'
import { messagesTable } from '@/app/db/schema/messages'
import { desc, eq, or, and } from 'drizzle-orm'

export const metadata = {
  title: 'Messages | InvestDirect Community',
  description: 'Connect with members through private messages.',
}

async function getActiveChats(userId: string) {
  // Get all messages where the user is either sender or receiver
  const messages = await db
    .select()
    .from(messagesTable)
    .where(
      or(
        eq(messagesTable.senderId, userId),
        eq(messagesTable.receiverId, userId),
      ),
    )
    .orderBy(desc(messagesTable.createdAt))

  // Group messages by chat_id and get the latest message for each chat
  const chatMap = new Map()
  for (const message of messages) {
    if (!chatMap.has(message.chatId)) {
      const otherUserId =
        message.senderId === userId ? message.receiverId : message.senderId

      // Get user information
      const userInfo = await getUser(otherUserId)

      chatMap.set(message.chatId, {
        id: message.chatId,
        otherUserId,
        otherUserName: userInfo.name,
        otherUserAvatar: userInfo.avatarUrl,
        lastMessage: {
          text: message.text,
          timestamp: message.createdAt,
          senderId: message.senderId,
        },
      })
    }
  }

  return Array.from(chatMap.values())
}

export default async function MessagesPage() {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Unauthorized')
  }

  const [chats, currentUser] = await Promise.all([
    getActiveChats(userId),
    getUser(userId),
  ])

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Messages</h3>
      {chats.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          No active chats yet. Start a conversation from the Members page.
        </div>
      ) : (
        <ChatList
          chats={chats}
          currentUserId={userId}
          currentUserAvatar={currentUser.avatarUrl}
        />
      )}
    </div>
  )
}
