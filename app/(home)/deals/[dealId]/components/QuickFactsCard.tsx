import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'

interface QuickFactsCardProps {
  dealName: string
  amount: number
  interestRate: number
  term: number
}

export function QuickFactsCard({
  dealName,
  amount,
  interestRate,
  term,
}: QuickFactsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{dealName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Amount Needed</p>
            <p className="text-2xl font-bold">{formatCurrency(amount)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Interest Rate</p>
            <p className="text-2xl font-bold">{interestRate}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Term</p>
            <p className="text-2xl font-bold">{term} months</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
