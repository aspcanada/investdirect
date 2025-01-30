'use server';

import { dealsTable, InsertDeal, SelectDeal } from 'app/db/schema/deals';
import { count, eq, ilike, sql, desc } from 'drizzle-orm';
import { db } from 'app/db';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';


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
    await db.delete(dealsTable).where(eq(dealsTable.id, dealId as string));

    revalidatePath('/');
    return { message: `Deleted deal ${dealId}` };
  } catch (e) {
    return { message: 'Failed to delete deal' };
  }
}

export async function createDeal(formData: any) {
  const user = await auth();

  if (!user?.userId) {
    console.log("User must be authenticated to create a deal.");
    return { message: "User must be authenticated to create a deal." };
  }
  
  try {
    await db.insert(dealsTable).values({
      userId: user.userId,
      dealName: formData.dealName,
      description: formData.description,
      financials: { ...formData },
      propertyDetails: { ...formData },
      images: [],
      documents: [],
    });

    console.log("Deal created successfully!");
    revalidatePath('/deals');
    return { message: `Deal ${formData.dealName} created successfully!` };
  } catch (error) {
    console.error("Database Insert Error:", error);
    return { message: "Failed to create deal." };
  }
}



export async function getDeals( 
  search: string,
  offset: number
): Promise<{
  deals: SelectDeal[];
  newOffset: number | null;
  totalDeals: number;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      deals: await db
        .select()
        .from(dealsTable)
        .where(ilike(dealsTable.dealName, `%${search}%`))
        .limit(1000),
      newOffset: null,
      totalDeals: 0
    };
  }

  if (offset === null) {
    return { deals: [], newOffset: null, totalDeals: 0 };
  }

  let totalDeals = await db.select({ count: count() }).from(dealsTable);
  // order by created_at desc
  let moreDeals = await db.select().from(dealsTable).orderBy(desc(dealsTable.createdAt)).limit(5).offset(offset);
  let newOffset = moreDeals.length >= 5 ? offset + 5 : null;

  return {
    deals: moreDeals,
    newOffset,
    totalDeals: totalDeals[0].count
  };
}
