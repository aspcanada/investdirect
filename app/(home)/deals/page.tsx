import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DealsGrid } from './_components/deal-grid'
import { getDeals } from './actions'
import Link from 'next/link'

export const metadata = {
  title: 'Deals | InvestDirect Community',
  description:
    'Browse and invest in real estate opportunities in our trusted community.',
}

export default async function DealsPage(props: {
  searchParams: Promise<{ q: string; offset: string }>
}) {
  const searchParams = await props.searchParams
  const offset = searchParams.offset ?? 0
  const limit = 6

  const { deals, totalDeals } = await getDeals(Number(offset), limit, undefined)

  return (
    <>
      <h3 className="font-semibold">Deals</h3>
      <p className="text-sm text-muted-foreground">
        Manage{' '}
        <Link href="/deals/my" className="text-primary hover:underline">
          your deals
        </Link>{' '}
        and view their performance.
      </p>
      <div className="flex justify-end items-center gap-2 mb-6">
        <Link href="/deals/add">
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Deal
            </span>
          </Button>
        </Link>
      </div>
      <DealsGrid
        deals={deals}
        offset={Number(offset)}
        totalDeals={totalDeals}
        limit={limit}
      />
    </>
  )
}
