import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DealForm } from '../../_components/deal-form'
import { notFound } from 'next/navigation'
import { getDeal } from '../../actions'

export const metadata = {
  title: 'Edit Deal',
  description: 'Edit an existing deal',
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
    <Card>
      <CardHeader>
        <CardTitle>Edit deal</CardTitle>
      </CardHeader>
      <CardContent>
        <DealForm mode="edit" deal={deal} />
      </CardContent>
    </Card>
  )
}
