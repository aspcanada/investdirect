import { io, Socket } from 'socket.io-client'

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001'

export const socket = io(SOCKET_URL, {
  path: '/api/socketio',
  addTrailingSlash: false,
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
})

// Connection events
socket.on('connect', () => {
  console.log('Connected to socket server')
})

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error)
})

socket.on('error', (error) => {
  console.error('Socket error:', error)
})

// Type definitions for better TypeScript support
export interface ChatMessage {
  id: string
  text: string
  senderId: string
  receiverId: string
  timestamp: Date
}

// Helper functions for chat operations
export const chatOperations = {
  joinChat: (chatId: string) => {
    socket.emit('join-chat', chatId)
  },

  leaveChat: (chatId: string) => {
    socket.emit('leave-chat', chatId)
  },

  sendMessage: (
    chatId: string,
    message: Omit<ChatMessage, 'id' | 'timestamp'>,
  ) => {
    socket.emit('send-message', {
      chatId,
      message,
    })
  },

  onChatHistory: (callback: (messages: ChatMessage[]) => void) => {
    socket.on('chat-history', callback)
  },

  onNewMessage: (callback: (message: ChatMessage) => void) => {
    socket.on('new-message', callback)
  },

  onError: (callback: (error: string) => void) => {
    socket.on('error', callback)
  },
}
