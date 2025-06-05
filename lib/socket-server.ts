import { Server as SocketIOServer } from 'socket.io'
import { createServer } from 'http'
import { adminDb } from '@/lib/firebase-admin'

let io: SocketIOServer

export function initSocketServer() {
  if (io) {
    return io
  }

  const httpServer = createServer()

  io = new SocketIOServer(httpServer, {
    path: '/api/socketio',
    addTrailingSlash: false,
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket) => {
    console.log('User connected', socket.id)

    socket.on('message', (msg) => {
      socket.broadcast.emit('message', msg)
    })

    socket.on('disconnect', () => {
      console.log('User disconnected', socket.id)
    })

    socket.on('join-chat', (chatId: string) => {
      socket.join(chatId)
    })

    socket.on('leave-chat', (chatId: string) => {
      socket.leave(chatId)
    })

    socket.on(
      'send-message',
      async (data: {
        chatId: string
        message: {
          text: string
          senderId: string
          receiverId: string
        }
      }) => {
        const { chatId, message } = data
        const messagesRef = adminDb
          .collection('chats')
          .doc(chatId)
          .collection('messages')
        const newMessage = await messagesRef.add({
          ...message,
          timestamp: new Date(),
        })

        io.to(chatId).emit('new-message', {
          id: newMessage.id,
          ...message,
          timestamp: new Date(),
        })
      },
    )
  })

  const PORT = process.env.SOCKET_PORT || 3001
  httpServer.listen(PORT, () => {
    console.log(`Socket.IO server running on port ${PORT}`)
  })

  return io
}

export function getSocketServer() {
  if (!io) {
    throw new Error('Socket server not initialized')
  }
  return io
}
