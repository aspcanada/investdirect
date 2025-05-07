import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DealForm } from '../_components/deal-form'

export const metadata = {
  title: 'Add Deal | InvestDirect Community',
  description:
    'Create a new real estate investment opportunity in our community.',
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
