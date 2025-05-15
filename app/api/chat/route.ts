import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { adminDb } from '@/lib/firebase-admin'

export async function GET(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const chatId = searchParams.get('chatId')

    if (!chatId) {
      return new NextResponse('Chat ID is required', { status: 400 })
    }

    const messagesRef = adminDb
      .collection('chats')
      .doc(chatId)
      .collection('messages')
    const snapshot = await messagesRef.orderBy('timestamp', 'asc').get()

    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error fetching messages:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const { text, receiverId } = body

    if (!text || !receiverId) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    const chatId = [userId, receiverId].sort().join('_')
    const messagesRef = adminDb
      .collection('chats')
      .doc(chatId)
      .collection('messages')

    await messagesRef.add({
      text,
      senderId: userId,
      receiverId,
      timestamp: new Date(),
    })

    return new NextResponse('Message sent', { status: 200 })
  } catch (error) {
    console.error('Error sending message:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
