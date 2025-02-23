import 'server-only';

import { jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
// import { createInsertSchema } from 'drizzle-zod';

export const dealsTable = pgTable('deals', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  dealName: text('deal_name').notNull(),
  description: text('description').notNull(),
  financials: jsonb('financials').$type<{
    value: number;
    repairCosts: number;
    amountNeeded: number;
    interestRate: number;
    loanTerm: number;
  }>().notNull(),
  propertyDetails: jsonb('property_details').$type<{
    propertyType: string;
    address: {
      street: string;
      city: string;
      province: string;
      postalCode: string;
    };
    bedrooms: number;
    bathrooms: number;
    year: number;
    buildingSf: number;
    lotSizeSf: number;
  }>().notNull(),
  images: jsonb('images').$type<string[]>().notNull(),
  documents: jsonb('documents').$type<string[]>().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// dealtypes
export type Deal = typeof dealsTable.$inferSelect;
export type NewDeal = typeof dealsTable.$inferInsert;