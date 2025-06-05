import { auth } from '@clerk/nextjs/server'
import { adminDb } from '@/lib/firebase-admin'
import { ChatList } from './_components/chat-list'
import { getUser } from '../members/actions'

export const metadata = {
  title: 'Messages | InvestDirect Community',
  description: 'Connect with members through private messages.',
}

async function getActiveChats(userId: string) {
  const chatsSnapshot = await adminDb
    .collection('chats')
    .where('participants', 'array-contains', userId)
    .get()

  const chats = await Promise.all(
    chatsSnapshot.docs.map(async (doc) => {
      const chatData = doc.data()
      const otherUserId = chatData.participants.find(
        (id: string) => id !== userId,
      )

      // Get the last message
      const lastMessageSnapshot = await doc.ref
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .limit(1)
        .get()

      const lastMessage = lastMessageSnapshot.docs[0]?.data()

      // Get user information
      const userInfo = await getUser(otherUserId)

      return {
        id: doc.id,
        otherUserId,
        otherUserName: userInfo.name,
        otherUserAvatar: userInfo.avatarUrl,
        lastMessage: lastMessage
          ? {
              text: lastMessage.text,
              timestamp: lastMessage.timestamp.toDate(),
              senderId: lastMessage.senderId,
            }
          : null,
      }
    }),
  )

  return chats
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
