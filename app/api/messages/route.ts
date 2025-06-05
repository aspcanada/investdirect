import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/app/db'
import { messagesTable } from '@/app/db/schema/messages'
import { eq, and } from 'drizzle-orm'

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { text, receiverId } = await req.json()
    if (!text || !receiverId) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    // Create chat_id by sorting and joining user IDs
    const chatId = [userId, receiverId].sort().join('_')

    // Insert the message
    const [message] = await db
      .insert(messagesTable)
      .values({
        chatId,
        senderId: userId,
        receiverId,
        text,
      })
      .returning()

    return NextResponse.json(message)
  } catch (error) {
    console.error('[MESSAGES_POST]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const chatId = searchParams.get('chatId')

    if (!chatId) {
      return new NextResponse('Chat ID is required', { status: 400 })
    }

    // Verify the user is part of this chat
    if (!chatId.includes(userId)) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Get messages for this chat
    const messages = await db
      .select()
      .from(messagesTable)
      .where(eq(messagesTable.chatId, chatId))
      .orderBy(messagesTable.createdAt)

    return NextResponse.json(messages)
  } catch (error) {
    console.error('[MESSAGES_GET]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
