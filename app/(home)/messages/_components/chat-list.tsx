'use client'

import { FC, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChatDialog } from '@/components/ChatDialog'
import { useAuth } from '@clerk/nextjs'
import moment from 'moment'

interface Chat {
  id: string
  otherUserId: string
  otherUserName: string
  otherUserAvatar: string
  lastMessage: {
    text: string
    timestamp: Date
    senderId: string
  } | null
}

interface ChatListProps {
  chats: Chat[]
  currentUserId: string
  currentUserAvatar: string
}

export const ChatList: FC<ChatListProps> = ({
  chats,
  currentUserId,
  currentUserAvatar,
}) => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const { userId } = useAuth()

  return (
    <>
      <div className="grid gap-4">
        {chats.map((chat) => (
          <Card
            key={chat.id}
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => setSelectedChat(chat)}
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src={chat.otherUserAvatar} />
                <AvatarFallback>
                  {chat.otherUserName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-base">
                  {chat.otherUserName}
                </CardTitle>
                <CardDescription>
                  {chat.lastMessage ? (
                    <>
                      <span
                        className={
                          chat.lastMessage.senderId === currentUserId
                            ? 'text-muted-foreground'
                            : ''
                        }
                      >
                        {chat.lastMessage.text}
                      </span>
                      <span className="ml-2 text-xs text-muted-foreground">
                        {moment(chat.lastMessage.timestamp).fromNow()}
                      </span>
                    </>
                  ) : (
                    'No messages yet'
                  )}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {selectedChat && (
        <ChatDialog
          isOpen={true}
          onClose={() => setSelectedChat(null)}
          currentUserId={userId || ''}
          otherUserId={selectedChat.otherUserId}
          otherUserName={selectedChat.otherUserName}
          currentUserAvatar={currentUserAvatar}
          otherUserAvatar={selectedChat.otherUserAvatar}
        />
      )}
    </>
  )
}
