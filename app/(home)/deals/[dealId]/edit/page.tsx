import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DealForm } from '@/app/(home)/deals/_components/deal-form';
import { db } from '@/app/db';
import { dealsTable } from '@/app/db/schema/deals';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Edit Deal',
  description: 'Edit an existing deal'
};

export default async function EditDealPage({
  params
}: {
  params: { id: string };
}) {
  const deal = await db.query.dealsTable.findFirst({
    where: eq(dealsTable.id, params.id)
  });

  if (!deal) {
    notFound();
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
  );
}
