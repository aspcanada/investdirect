'use server';

import { dealsTable, InsertDeal, SelectDeal } from 'app/db/schema/deals';
import { count, eq, ilike, sql, desc } from 'drizzle-orm';
import { db } from 'app/db';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

import { createInsertSchema } from 'drizzle-zod';
import { redirect } from 'next/navigation';

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
});

/**
 * Utility type to generate all possible nested paths of an object type
 * Example: "financials.value" | "propertyDetails.address.street"
 */
// TODO: move
type NestedPaths<T> = T extends object
  ? {
      [K in keyof T & (string | number)]: T[K] extends object
        ? `${K}` | `${K}.${NestedPaths<T[K]>}`
        : `${K}`;
    }[keyof T & (string | number)]
  : never;

export interface ActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in NestedPaths<InsertDeal>]?: string[];
  };
  inputs?: InsertDeal;
}

export async function createDeal(prevState: ActionResponse | null, formData: FormData): Promise<ActionResponse> {
  const { userId } = await auth();
  try {
    const rawData: InsertDeal = {
      userId: userId!,
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
      images: [],
      documents: [],
    }

    const validatedData = dealInsertSchema.safeParse(rawData);

    if (!validatedData.success) {
      const formattedErrors = validatedData.error.issues.reduce((acc, issue) => {
        acc[issue.path.join(".")] = [issue.message];
        return acc;
      }, {} as { [key: string]: string[] });

      console.log('formattedErrors', formattedErrors);

      return {
        success: false,
        message: 'Please fix the errors in the form',
        errors: formattedErrors,
        inputs: rawData
      }
    }

    // Here you would typically save the address to your database
    console.log('Deal validated:', validatedData.data)

    await db.insert(dealsTable).values(rawData);
    console.log("Deal created successfully!");
    // return { success: true,message: `Deal ${rawData.dealName} created successfully!` };

  } catch (error) {
    console.error("Database Insert Error:", error);
    return { success: false, message: "Failed to create deal." };
  }

  revalidatePath('/deals');
  redirect('/deals');
}

