'use client'

import { Deal } from 'app/db/schema/deals'
import { DealCard } from './deal-card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
interface DealsGridProps {
  deals: Deal[]
  offset: number
  totalDeals: number
  limit: number
}

export function DealsGrid({
  deals,
  offset,
  totalDeals,
  limit,
}: DealsGridProps) {
  const router = useRouter()
  const start = offset + 1
  const end = Math.min(offset + limit, totalDeals)

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>

      <form className="flex items-center w-full justify-between">
        <div className="text-xs text-muted-foreground">
          Showing{' '}
          <strong>
            {start}-{end}
          </strong>{' '}
          of <strong>{totalDeals}</strong> deals
        </div>
        <div className="flex">
          <Button
            formAction={prevPage}
            variant="ghost"
            size="sm"
            type="submit"
            disabled={offset === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Prev
          </Button>
          <Button
            formAction={nextPage}
            variant="ghost"
            size="sm"
            type="submit"
            disabled={end >= totalDeals}
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )

  function prevPage() {
    const newOffset = Math.max(0, offset - limit)
    router.push(`/deals?offset=${newOffset}`, { scroll: false })
  }

  function nextPage() {
    const newOffset = offset + limit
    router.push(`/deals?offset=${newOffset}`, { scroll: false })
  }
}
