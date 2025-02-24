import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DealsTable } from './deals-table';
import { getDeals } from './actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Link from 'next/link';

export const metadata = {
  title: 'Deals',
  description: 'Browse and manage investment opportunities.'
};

export default async function DealsPage(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  const searchParams = await props.searchParams;
  const offset = searchParams.offset ?? 0;
  const limit = 5;

  const { deals, totalDeals } = await getDeals(Number(offset), limit);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deals</CardTitle>
        <CardDescription>
          Manage your deals and view their performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end items-center gap-2">
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
      </CardContent>
    </Card>
  );
}
