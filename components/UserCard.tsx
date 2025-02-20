'use client';

import { FC } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, UserPlus } from 'lucide-react';
import moment from 'moment';

interface UserCardProps {
  name: string;
  id: string;
  avatarUrl?: string;
  lastSignInAt?: number;
  // onMessageClick: () => void;
}

const UserCard: FC<UserCardProps> = ({
  name,
  id,
  avatarUrl,
  lastSignInAt
  // onMessageClick
}) => {
  return (
    <Card>
      <CardHeader className="flex items-center">
        <Avatar className="h-16 w-16">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={name} />
          ) : (
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          )}
        </Avatar>
        <div>
          <CardTitle className="text-lg">{name}</CardTitle>
          <CardDescription>
            Active: {lastSignInAt ? moment(lastSignInAt).fromNow() : 'Never'}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex justify-center gap-2">
        <Button>
          <UserPlus />
          Follow
        </Button>
        <Button variant="outline">
          <MessageCircle />
          Message
        </Button>
      </CardContent>
    </Card>
  );
};

export { UserCard };
