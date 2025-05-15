import { FC, useEffect, useState } from 'react'
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

  useEffect(() => {
    if (!isOpen) return

    const fetchMessages = async () => {
      try {
        const token = await getToken()
        const response = await fetch(
          `/api/chat?chatId=${[currentUserId, otherUserId].sort().join('_')}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        const data = await response.json()
        setMessages(data)
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }

    fetchMessages()
    // Set up polling for new messages
    const interval = setInterval(fetchMessages, 5000)
    return () => clearInterval(interval)
  }, [isOpen, currentUserId, otherUserId, getToken])

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
