import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DealForm } from '../_components/deal-form'

export const metadata = {
  title: 'Add Deal',
  description: 'Add a new deal to the database',
}

export default function AddDealPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add a deal</CardTitle>
      </CardHeader>
      <CardContent>
        <DealForm mode="add" />
      </CardContent>
    </Card>
  )
}
