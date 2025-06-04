'use client'

import { FC } from 'react'
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
import { useComingSoonDialog } from '@/components/providers/coming-soon-dialog'

interface UserCardProps {
  name: string
  id: string
  avatarUrl?: string
  lastSignInAt?: number
}

const UserCard: FC<UserCardProps> = ({
  name,
  id,
  avatarUrl,
  lastSignInAt,
  // onMessageClick
}) => {
  const { showComingSoon } = useComingSoonDialog()

  return (
    <Card>
      <CardHeader className="flex items-center">
        <Avatar className="h-32 w-32">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={name} />
          ) : (
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          )}
        </Avatar>
        {/* <div> */}
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription className="flex flex-col gap-2">
          {/* TODO: Add job title */}
          <div>
            <Badge>Lender</Badge>
          </div>
          Active: {lastSignInAt ? moment(lastSignInAt).fromNow() : 'Never'}
        </CardDescription>
        {/* </div> */}
      </CardHeader>
      <CardContent className="flex justify-center gap-2">
        <Button onClick={() => showComingSoon('Follow')}>
          <UserPlus />
          Follow
        </Button>
        <Button variant="outline" onClick={() => showComingSoon('Messages')}>
          <MessageCircle />
          Message
        </Button>
      </CardContent>
    </Card>
  )
}

export { UserCard }
