'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import { DealRow } from './deal-row';
import { SelectDeal } from 'app/db/schema/deals';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DealsTable({
  deals,
  offset,
  totalDeals
}: {
  deals: SelectDeal[];
  offset: number;
  totalDeals: number;
}) {
  let router = useRouter();
  let dealsPerPage = 5;

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/deals?offset=${offset}`, { scroll: false });
  }

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
            <DealRow key={deal.id} deal={deal} />
          ))}
        </TableBody>
      </Table>
      <form className="flex items-center w-full justify-between">
        <div className="text-xs text-muted-foreground">
          Showing{' '}
          <strong>
            {Math.max(0, Math.min(offset - dealsPerPage, totalDeals) + 1)}-
            {offset}
          </strong>{' '}
          of <strong>{totalDeals}</strong> products
        </div>
        <div className="flex">
          <Button
            formAction={prevPage}
            variant="ghost"
            size="sm"
            type="submit"
            disabled={offset === dealsPerPage}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Prev
          </Button>
          <Button
            formAction={nextPage}
            variant="ghost"
            size="sm"
            type="submit"
            disabled={offset + dealsPerPage > totalDeals}
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </>
  );
}
