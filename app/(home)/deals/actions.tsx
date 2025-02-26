'use server'

import { dealsTable, NewDeal } from 'app/db/schema/deals'
import { count, eq, ilike, sql, desc } from 'drizzle-orm'
import { db } from 'app/db'
import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'
import { notFound, redirect } from 'next/navigation'
import { createInsertSchema } from 'drizzle-zod'
import { Deal } from 'app/db/schema/deals'
import {
  DealWithUser,
  getDealsCount,
  getDealsWithUsers,
} from '@/app/db/queries/deals-with-users'

const dealInsertSchema = createInsertSchema(dealsTable, {
  dealName: z.string().min(1, 'Deal name is required'),
  description: z.string().min(1, 'Description is required'),
  financials: z.object({
    value: z.number().min(1, 'Value is required'),
    repairCosts: z.number().optional(),
    amountNeeded: z.number().min(1, 'Amount needed is required'),
    interestRate: z.number().min(1, 'Interest rate is required'),
    loanTerm: z.number().min(1, 'Loan term is required'),
  }),
  propertyDetails: z.object({
    propertyType: z.string().optional(), //TODO: change to enum
    address: z.object({
      street: z.string().min(1, 'Street is required'),
      city: z.string().min(1, 'City is required'),
      province: z.string().min(1, 'Province is required'),
      postalCode: z.string().min(1, 'Postal code is required'),
    }),
    bedrooms: z.number().optional(),
    bathrooms: z.number().optional(),
    year: z.number().min(1, 'Year is required'),
    buildingSf: z.number().optional(),
    lotSizeSf: z.number().optional(),
  }),
  images: z.array(z.string().url()).default([]),
})

/**
 * Utility type to generate all possible nested paths of an object type
 * Example: "financials.value" | "propertyDetails.address.street"
 */
// TODO: move
type NestedPaths<T> = T extends object
  ? {
      [K in keyof T & (string | number)]: T[K] extends object
        ? `${K}` | `${K}.${NestedPaths<T[K]>}`
        : `${K}`
    }[keyof T & (string | number)]
  : never

export interface ActionResponse {
  success: boolean
  message: string
  errors?: {
    [K in NestedPaths<Deal>]?: string[]
  }
  inputs?: Deal
}

// see https://github.com/vercel/next.js/blob/canary/examples/next-forms/app/actions.ts
export async function deleteDeal(
  prevState: {
    message: string
  },
  formData: FormData,
) {
  const user = await auth()

  const userId = formData.get('userId')
  const dealId = formData.get('dealId')

  // only allowed to delete your own deals
  if (user?.userId !== userId) {
    console.log('User is not allowed to delete this deal')
    return { message: 'You are not allowed to delete this deal' }
  }

  // TODO: add a check to see if the deal is in the database
  // TODO: only allow admins to delete deals

  try {
    await db.delete(dealsTable).where(eq(dealsTable.id, dealId as string))
    revalidatePath('/deals')
    return { message: `Deleted deal ${dealId}` }
  } catch (e) {
    console.error('Database Delete Error:', e)
    return { message: 'Failed to delete deal' }
  }
}

/**
 * Unified function to create or update a deal
 * @param prevState Previous form state for error handling
 * @param formData Form data containing deal information
 * @returns ActionResponse with success/error information
 */
export async function upsertDeal(
  prevState: ActionResponse | null,
  formData: FormData,
): Promise<ActionResponse> {
  const { userId } = await auth()
  const dealId = formData.get('id') as string | null

  // if (!userId) {
  //   return {
  //     success: false,
  //     message: "User must be authenticated to manage deals."
  //   };
  // }

  let deal: NewDeal
  deal = {
    userId: userId as string,
    dealName: formData.get('dealName') as string,
    description: formData.get('description') as string,
    financials: {
      value: Number(formData.get('value')),
      repairCosts: Number(formData.get('repairCosts')),
      amountNeeded: Number(formData.get('amountNeeded')),
      interestRate: Number(formData.get('interestRate')),
      loanTerm: Number(formData.get('loanTerm')),
    },
    propertyDetails: {
      propertyType: formData.get('propertyType') as string,
      address: {
        street: formData.get('street') as string,
        city: formData.get('city') as string,
        province: formData.get('province') as string,
        postalCode: formData.get('postalCode') as string,
      },
      bedrooms: Number(formData.get('bedrooms')),
      bathrooms: Number(formData.get('bathrooms')),
      year: Number(formData.get('year')),
      buildingSf: Number(formData.get('buildingSf')),
      lotSizeSf: Number(formData.get('lotSizeSf')),
    },
    images: JSON.parse((formData.get('images') as string) || '[]'),
    documents: [],
  }

  if (dealId) {
    deal.id = dealId
    deal.updatedAt = new Date()
  }

  // Validate the data
  const validatedData = dealInsertSchema.safeParse(deal)

  if (!validatedData.success) {
    const formattedErrors = validatedData.error.issues.reduce(
      (acc, issue) => {
        acc[issue.path.join('.')] = [issue.message]
        return acc
      },
      {} as { [key: string]: string[] },
    )

    return {
      success: false,
      message: 'Please fix the errors in the form',
      errors: formattedErrors,
      inputs: deal as Deal, // Type assertion since we're adding it to ActionResponse
    }
  }

  try {
    if (dealId) {
      // Update existing deal
      await db
        .update(dealsTable)
        .set({
          ...deal,
          updatedAt: new Date(),
        })
        .where(eq(dealsTable.id, dealId))
    } else {
      // Create new deal
      await db.insert(dealsTable).values(deal)
    }
  } catch (error) {
    console.error('Database Upsert Error:', error)
    return {
      success: false,
      message: dealId ? 'Failed to update deal.' : 'Failed to create deal.',
    }
  }

  revalidatePath('/deals')
  redirect('/deals')
}

export async function getDeal(dealId: string): Promise<Deal | null> {
  try {
    const deal = await db.query.dealsTable.findFirst({
      where: eq(dealsTable.id, dealId),
    })

    if (!deal) {
      return null
    }
    return deal
  } catch (error) {
    // console.error(error);
    return null
  }
}

export async function getDealsOld(
  offset: number,
  limit: number,
  userId: string | null,
): Promise<{
  deals: Deal[]
  totalDeals: number
}> {
  if (offset === null) {
    return { deals: [], totalDeals: 0 }
  }

  let totalDeals: { count: number }[] = []
  let deals: Deal[] = []

  if (!userId) {
    totalDeals = await db.select({ count: count() }).from(dealsTable)
    deals = await db
      .select()
      .from(dealsTable)
      .orderBy(desc(dealsTable.updatedAt))
      .limit(limit)
      .offset(offset)
  } else {
    totalDeals = await db.select({ count: count() }).from(dealsTable)
    deals = await db
      .select()
      .from(dealsTable)
      .where(eq(dealsTable.userId, userId))
      .orderBy(desc(dealsTable.updatedAt))
      .limit(limit)
      .offset(offset)
  }

  return {
    deals: deals,
    totalDeals: totalDeals[0].count,
  }
}

export async function getDeals(
  offset: number,
  limit: number,
  userId: string | undefined,
): Promise<{
  deals: DealWithUser[]
  totalDeals: number
}> {
  const deals = await getDealsWithUsers({
    limit: limit,
    offset: offset,
    userId: userId,
  })

  const totalDeals = await getDealsCount({
    userId: userId,
  })

  return {
    deals: deals,
    totalDeals: totalDeals,
  }
}
