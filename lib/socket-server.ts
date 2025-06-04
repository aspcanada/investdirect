import { Server as NetServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { adminDb } from '@/lib/firebase-admin'

let io: SocketIOServer

export const initSocketServer = (httpServer: NetServer) => {
  if (!io) {
    io = new SocketIOServer(httpServer, {
      path: '/api/socketio',
      addTrailingSlash: false,
    })

    io.on('connection', (socket) => {
      console.log('Client connected')

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
  }
  return io
}

export const getIO = () => io
