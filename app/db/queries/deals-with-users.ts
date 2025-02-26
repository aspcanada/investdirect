import { and, desc, eq, sql } from 'drizzle-orm'
import { db } from '../index'
import { dealsTable } from '../schema/deals'
import { users } from '../schema/users'

export type DealWithUser = {
  dealId: string
  dealName: string
  description: string
  financials: {
    value: number
    repairCosts: number
    amountNeeded: number
    interestRate: number
    loanTerm: number
  }
  propertyDetails: {
    propertyType: string
    address: {
      street: string
      city: string
      province: string
      postalCode: string
    }
    bedrooms: number
    bathrooms: number
    year: number
    buildingSf: number
    lotSizeSf: number
  }
  images: string[]
  documents: string[]
  dealCreatedAt: Date
  dealUpdatedAt: Date
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
    avatarUrl: string | null
    role: string
    createdAt: Date
    updatedAt: Date
  }
}

/**
 * Query builder for fetching deals with associated user information
 * @param options Query options for filtering and pagination
 * @returns Promise<DealWithUser[]>
 */
export async function getDealsWithUsers(options?: {
  userId?: string
  dealId?: string
  limit?: number
  offset?: number
}): Promise<DealWithUser[]> {
  const query = db
    .select({
      dealId: dealsTable.id,
      dealName: dealsTable.dealName,
      description: dealsTable.description,
      financials: dealsTable.financials,
      propertyDetails: dealsTable.propertyDetails,
      images: dealsTable.images,
      documents: dealsTable.documents,
      dealCreatedAt: dealsTable.createdAt,
      dealUpdatedAt: dealsTable.updatedAt,
      user: sql<DealWithUser['user']>`jsonb_build_object(
        'id', ${users.id},
        'firstName', ${users.firstName},
        'lastName', ${users.lastName},
        'email', ${users.email},
        'avatarUrl', ${users.avatarUrl},
        'role', ${users.role},
        'createdAt', ${users.createdAt},
        'updatedAt', ${users.updatedAt}
      )`,
    })
    .from(dealsTable)
    .innerJoin(users, eq(dealsTable.userId, users.id))

  // Apply filters
  const conditions = []
  if (options?.userId) {
    conditions.push(eq(dealsTable.userId, options.userId))
  }
  if (options?.dealId) {
    conditions.push(eq(dealsTable.id, options.dealId))
  }
  if (conditions.length > 0) {
    query.where(and(...conditions))
  }

  // Apply pagination
  if (options?.limit) {
    query.limit(options.limit)
  }
  if (options?.offset) {
    query.offset(options.offset)
  }

  // Sort by most recently updated
  query.orderBy(desc(dealsTable.updatedAt))

  return query
}

/**
 * Get a single deal with user information
 * @param dealId The ID of the deal to fetch
 * @returns Promise<DealWithUser | null>
 */
export async function getDealWithUser(
  dealId: string,
): Promise<DealWithUser | null> {
  const results = await getDealsWithUsers({ dealId })
  return results[0] || null
}

/**
 * Get total count of deals matching the filter criteria
 * @param options Filter options
 * @returns Promise<number>
 */
export async function getDealsCount(options?: {
  userId?: string
}): Promise<number> {
  const query = db.select({ count: sql<number>`count(*)` }).from(dealsTable)

  if (options?.userId) {
    query.where(eq(dealsTable.userId, options.userId))
  }

  const result = await query
  return result[0]?.count || 0
}
