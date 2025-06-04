import { NextResponse } from 'next/server'
import { Server } from 'socket.io'

export async function GET(req: Request) {
  const res: any = new NextResponse()
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server)
    res.socket.server.io = io
    io.on('connection', (socket) => {
      console.log('User connected', socket.id)

      socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg) // Send message to all except sender
      })

      socket.on('disconnect', () => {
        console.log('User disconnected', socket.id)
      })
    })
  }
  res.end()
}
