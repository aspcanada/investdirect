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
import { MessageCircle } from 'lucide-react';
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
    <Card className="w-full max-w-sm p-4 shadow-lg">
      <CardHeader className="flex items-center space-x-4">
        <Avatar className="h-16 w-16">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={name} />
          ) : (
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          )}
        </Avatar>
        <div>
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          <CardDescription>
            Active: {lastSignInAt ? moment(lastSignInAt).fromNow() : 'Never'}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex justify-center pt-4">
        <Button
          // onClick={onMessageClick}
          variant="default"
          className="flex items-center space-x-2"
        >
          <MessageCircle className="h-4 w-4" />
          <span>Message</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserCard;
