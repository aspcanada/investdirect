import { io } from 'socket.io-client'

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001'

export const socket = io(SOCKET_URL, {
  path: '/api/socketio',
  addTrailingSlash: false,
  autoConnect: true,
})

socket.on('connect', () => {
  console.log('Connected to socket server')
})

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error)
})
