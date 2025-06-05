import { NextResponse } from 'next/server'
import { initSocketServer } from '@/lib/socket-server'

// Initialize the socket server
initSocketServer()

export async function GET() {
  return new NextResponse('Socket server running', { status: 200 })
}
