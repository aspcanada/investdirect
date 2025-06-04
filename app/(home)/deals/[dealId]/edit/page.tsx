import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DealForm } from '../../_components/deal-form'
import { notFound } from 'next/navigation'
import { getDeal } from '../../actions'

export const metadata = {
  title: 'Edit Deal | InvestDirect Community',
  description:
    'Modify and update your real estate investment opportunity details.',
}

interface EditDealPageProps {
  params: Promise<{ dealId: string }>
}

export default async function EditDealPage({ params }: EditDealPageProps) {
  const { dealId } = await params
  const deal = await getDeal(dealId)

  if (!deal) {
    notFound()
  }

  return (
    <>
      <h3 className="font-semibold">Edit Deal</h3>
      <p className="text-sm text-muted-foreground">
        Modify and update your real estate investment opportunity details.
      </p>
      <DealForm mode="edit" deal={deal} />
    </>
  )
}
