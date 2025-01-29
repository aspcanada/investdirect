'use server';

import { deals, TDeal } from 'app/db/schema/deals';
import { count, eq, ilike } from 'drizzle-orm';
import { db } from 'app/db';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';

// see https://github.com/vercel/next.js/blob/canary/examples/next-forms/app/actions.ts
export async function deleteDeal(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const user = await auth();
  const userId = formData.get('userId');
  const dealId = formData.get('dealId');

  // only allowed to delete your own deals
  if (user?.userId !== userId) {
    return { message: 'You are not allowed to delete this deal' };
  }


  // TODO: add a check to see if the deal is in the database
  // TODO: only allow admins to delete deals

  try {
    await db.delete(deals).where(eq(deals.id, dealId as string));

    revalidatePath('/');
    return { message: `Deleted deal ${dealId}` };
  } catch (e) {
    return { message: 'Failed to delete deal' };
  }
}

export async function getDeals( 
  search: string,
  offset: number
): Promise<{
  deals: TDeal[];
  newOffset: number | null;
  totalDeals: number;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      deals: await db
        .select()
        .from(deals)
        .where(ilike(deals.dealName, `%${search}%`))
        .limit(1000),
      newOffset: null,
      totalDeals: 0
    };
  }

  if (offset === null) {
    return { deals: [], newOffset: null, totalDeals: 0 };
  }

  let totalDeals = await db.select({ count: count() }).from(deals);
  let moreDeals = await db.select().from(deals).limit(5).offset(offset);
  let newOffset = moreDeals.length >= 5 ? offset + 5 : null;

  return {
    deals: moreDeals,
    newOffset,
    totalDeals: totalDeals[0].count
  };
}
