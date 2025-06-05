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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Message {
  id: string
  text: string
  senderId: string
  receiverId: string
  createdAt: string
}

interface ChatDialogProps {
  isOpen: boolean
  onClose: () => void
  currentUserId: string
  otherUserId: string
  otherUserName: string
  currentUserAvatar: string
  otherUserAvatar: string
}

const INACTIVITY_TIMEOUT = 5 * 60 * 1000 // 5 minutes in milliseconds

const ChatDialog: FC<ChatDialogProps> = ({
  isOpen,
  onClose,
  currentUserId,
  otherUserId,
  otherUserName,
  currentUserAvatar,
  otherUserAvatar,
}) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const { getToken } = useAuth()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const pollIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const inactivityTimerRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current)
    }
    inactivityTimerRef.current = setTimeout(onClose, INACTIVITY_TIMEOUT)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const fetchMessages = async () => {
    try {
      const token = await getToken()
      const chatId = [currentUserId, otherUserId].sort().join('_')
      const response = await fetch(`/api/messages?chatId=${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      setMessages(data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  useEffect(() => {
    if (!isOpen) return

    // Initial fetch
    fetchMessages()

    // Set up polling every 2 seconds
    pollIntervalRef.current = setInterval(fetchMessages, 2000)

    // Start inactivity timer
    resetInactivityTimer()

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current)
      }
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
      }
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
      await fetch('/api/messages', {
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
      // Fetch messages immediately after sending
      fetchMessages()
      // Reset inactivity timer
      resetInactivityTimer()
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const handleUserActivity = () => {
    resetInactivityTimer()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[425px]"
        onMouseMove={handleUserActivity}
        onKeyDown={handleUserActivity}
      >
        <DialogHeader>
          <DialogTitle>Chat with {otherUserName}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-[400px]">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {messages.map((msg) => {
              const isCurrentUser = msg.senderId === currentUserId
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${
                    isCurrentUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {!isCurrentUser && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={otherUserAvatar} />
                      <AvatarFallback>{otherUserName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`p-2 rounded-lg max-w-[80%] ${
                      isCurrentUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {isCurrentUser && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUserAvatar} />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
                handleUserActivity()
              }}
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
