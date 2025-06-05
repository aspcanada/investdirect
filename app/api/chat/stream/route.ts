import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { adminDb } from '@/lib/firebase-admin'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const chatId = searchParams.get('chatId')
    const token = searchParams.get('token')

    if (!chatId || !token) {
      return new NextResponse('Chat ID and token are required', { status: 400 })
    }

    // Verify the token with Clerk
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Set up SSE headers
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        // Set up Firestore listener
        const messagesRef = adminDb
          .collection('chats')
          .doc(chatId)
          .collection('messages')
          .orderBy('timestamp', 'desc')
          .limit(1)

        const unsubscribe = messagesRef.onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
              const message = {
                id: change.doc.id,
                ...change.doc.data(),
              }
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(message)}\n\n`),
              )
            }
          })
        })

        // Clean up listener when client disconnects
        request.signal.addEventListener('abort', () => {
          unsubscribe()
          controller.close()
        })
      },
    })

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Error in chat stream:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
