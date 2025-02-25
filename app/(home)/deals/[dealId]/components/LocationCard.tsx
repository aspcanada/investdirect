import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin } from 'lucide-react'
import Link from 'next/link'
interface LocationCardProps {
  address: {
    street: string
    city: string
    province: string
    postalCode: string
  }
}

export function LocationCard({ address }: LocationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Location</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-2">
          <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
          <div>
            <p className="font-medium">
              <Link
                className="hover:underline"
                target="_blank"
                href={`https://www.google.com/maps/search/?api=1&query=${address.street}, ${address.city}, ${address.province}, ${address.postalCode}`}
              >
                {address.street}
              </Link>
            </p>
            <p className="text-muted-foreground">
              {address.city}, {address.province} {address.postalCode}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
