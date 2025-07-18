'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ImageIcon } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import { DealWithUser } from 'app/db/queries/deals-with-users'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface DealCardProps {
  deal: DealWithUser
}

export function DealCard({ deal }: DealCardProps) {
  const hasImage = deal.images.length > 0
  const userInitials = `${deal.user.firstName[0]}${deal.user.lastName[0]}`

  return (
    <Link href={`/deals/${deal.dealId}`} className="block group">
      <Card className="overflow-hidden transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-lg">
        <div className="relative h-48 w-full">
          {hasImage ? (
            <Image
              alt="Deal image"
              className="object-cover"
              fill
              src={deal.images[0]}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <ImageIcon className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
        </div>
        <CardHeader>
          <div className="space-y-1">
            <div className="text-xl font-semibold transition-colors">
              {deal.dealName}
            </div>
            <p className="text-sm text-muted-foreground">
              {deal.propertyDetails.address.city},{' '}
              {deal.propertyDetails.address.province}
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Amount Needed</p>
              <p className="font-medium">
                {formatCurrency(deal.financials.amountNeeded)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Interest Rate</p>
              <p className="font-medium">{deal.financials.interestRate}%</p>
            </div>
            <div>
              <p className="text-muted-foreground">Term</p>
              <p className="font-medium">{deal.financials.loanTerm} months</p>
            </div>
            <div>
              <p className="text-muted-foreground">Property Type</p>
              <p className="font-medium">{deal.propertyDetails.propertyType}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={deal.user.avatarUrl || undefined} />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              {deal.user.firstName} {deal.user.lastName}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
