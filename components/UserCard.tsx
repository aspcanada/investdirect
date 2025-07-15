'use client'

import { FC, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { MessageCircle, UserPlus } from 'lucide-react'
import moment from 'moment'
import { Badge } from './ui/badge'
import { ChatDialog } from './ChatDialog'
import { useAuth, useUser } from '@clerk/nextjs'

interface UserCardProps {
  name: string
  id: string
  avatarUrl?: string
  lastSignInAt?: number
}

const UserCard: FC<UserCardProps> = ({ name, id, avatarUrl, lastSignInAt }) => {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const { userId } = useAuth()
  const { user } = useUser()

  return (
    <>
      <Card>
        <CardHeader className="flex items-center">
          <Avatar className="h-32 w-32">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={name} />
            ) : (
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <CardTitle className="text-lg">{name}</CardTitle>
          <CardDescription className="flex flex-col gap-2">
            <div>
              <Badge>Lender</Badge>
            </div>
            Active: {lastSignInAt ? moment(lastSignInAt).fromNow() : 'Never'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center gap-2">
          <Button>
            <UserPlus />
            Follow
          </Button>
          {userId !== id && (
            <Button variant="outline" onClick={() => setIsChatOpen(true)}>
              <MessageCircle />
              Message
            </Button>
          )}
        </CardContent>
      </Card>

      <ChatDialog
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        currentUserId={userId || ''}
        otherUserId={id}
        otherUserName={name}
        currentUserAvatar={user?.imageUrl || ''}
        otherUserAvatar={avatarUrl || ''}
      />
    </>
  )
}

export { UserCard }
