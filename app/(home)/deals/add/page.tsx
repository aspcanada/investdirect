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
    <>
      <h3 className="font-semibold">Add Deal</h3>
      <p className="text-sm text-muted-foreground">
        Create a new real estate investment opportunity in our community.
      </p>
      <DealForm mode="add" />
    </>
  )
}
