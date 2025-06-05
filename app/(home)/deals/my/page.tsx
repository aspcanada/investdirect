import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getDeals } from '../actions'
import Link from 'next/link'
import { DealsTable } from '../_components/deal-table'
import { auth } from '@clerk/nextjs/server'

export const metadata = {
  title: 'My Deals | InvestDirect Community',
  description: 'Manage and track your real estate investment opportunities.',
}

export default async function DealsPage(props: {
  searchParams: Promise<{ q: string; offset: string }>
}) {
  const searchParams = await props.searchParams
  const offset = searchParams.offset ?? 0
  const limit = 5

  const user = await auth()

  const { deals, totalDeals } = await getDeals(
    Number(offset),
    limit,
    user!.userId!,
  )

  return (
    <>
      <h3 className="font-semibold">My Deals</h3>
      <p className="text-sm text-muted-foreground">
        Manage your deals and view their performance.
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
      <DealsTable
        deals={deals}
        offset={Number(offset)}
        totalDeals={totalDeals}
        limit={limit}
      />
    </>
  )
}
