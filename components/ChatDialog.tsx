import { FC, useEffect, useState, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'

interface Message {
  id: string
  text: string
  senderId: string
  receiverId: string
  timestamp: Date
}

interface ChatDialogProps {
  isOpen: boolean
  onClose: () => void
  currentUserId: string
  otherUserId: string
  otherUserName: string
}

const ChatDialog: FC<ChatDialogProps> = ({
  isOpen,
  onClose,
  currentUserId,
  otherUserId,
  otherUserName,
}) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const { getToken } = useAuth()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (!isOpen) return

    const chatId = [currentUserId, otherUserId].sort().join('_')
    let eventSource: EventSource | null = null

    const setupEventSource = async () => {
      const token = await getToken()
      eventSource = new EventSource(
        `/api/chat/stream?chatId=${chatId}&token=${token}`,
      )

      eventSource.onmessage = (event) => {
        const newMessage = JSON.parse(event.data) as Message
        setMessages((prev) => {
          // Check if message already exists
          const exists = prev.some((msg) => msg.id === newMessage.id)
          if (exists) return prev
          return [...prev, newMessage]
        })
      }

      eventSource.onerror = (error) => {
        console.error('EventSource error:', error)
        eventSource?.close()
      }
    }

    // Initial fetch of messages
    const fetchMessages = async () => {
      try {
        const token = await getToken()
        const response = await fetch(`/api/chat?chatId=${chatId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await response.json()
        // Sort messages by timestamp to ensure consistent order
        const sortedMessages = data.sort(
          (a: Message, b: Message) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
        )
        setMessages(sortedMessages)
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }

    fetchMessages()
    setupEventSource()

    return () => {
      eventSource?.close()
    }
  }, [isOpen, currentUserId, otherUserId, getToken])

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!message.trim()) return

    try {
      const token = await getToken()
      await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: message,
          receiverId: otherUserId,
        }),
      })
      setMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chat with {otherUserName}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-[400px]">
          <div className="flex-1 overflow-y-auto mb-4 space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.senderId === currentUserId
                    ? 'bg-primary text-primary-foreground ml-auto'
                    : 'bg-muted'
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button onClick={sendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { ChatDialog }
