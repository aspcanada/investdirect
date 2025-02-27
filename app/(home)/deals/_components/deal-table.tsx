'use client'

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
} from '@/components/ui/table'
import { DealRow } from './deal-row'
import { DealWithUser } from '@/app/db/queries/deals-with-users'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function DealsTable({
  deals,
  offset,
  totalDeals,
  limit,
}: {
  deals: DealWithUser[]
  offset: number
  totalDeals: number
  limit: number
}) {
  let router = useRouter()
  let dealsPerPage = limit

  function prevPage() {
    const newOffset = Math.max(0, offset - dealsPerPage)
    router.push(`/deals?offset=${newOffset}`, { scroll: false })
  }

  function nextPage() {
    const newOffset = offset + dealsPerPage
    router.push(`/deals?offset=${newOffset}`, { scroll: false })
  }

  // Calculate current page range
  const start = offset + 1
  const end = Math.min(offset + dealsPerPage, totalDeals)

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell">
              <span className="sr-only">Image</span>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Amount Needed</TableHead>
            <TableHead>Rate</TableHead>
            <TableHead>Term</TableHead>
            {/* TODO: add closing date */}
            {/* <TableHead>Closing Date</TableHead> */}
            <TableHead className="hidden md:table-cell">City</TableHead>
            {/* <TableHead className="hidden md:table-cell">Created at</TableHead> */}
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deals.map((deal) => (
            <DealRow key={deal.dealId} deal={deal} />
          ))}
        </TableBody>
      </Table>
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
    </>
  )
}
