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

const dealSchema = createInsertSchema(dealsTable);

export interface ActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof InsertDeal]?: string[];
  };
  inputs?: InsertDeal;
}

export async function createDeal(prevState: ActionResponse | null, formData: FormData): Promise<ActionResponse> {
  const { userId } = await auth();
  try {
    const rawData: InsertDeal = {
      userId: userId as string,
      dealName: formData.get('dealName') as string,
      description: formData.get('description') as string,
      financials: {
        value: Number(formData.get('financials.value')),
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

    const validatedData = dealSchema.safeParse(rawData);

    if (!validatedData.success) {
      console.log('Deal validation errors:', validatedData.error.flatten().fieldErrors);
      return {
        success: false,
        message: 'Please fix the errors in the form',
        errors: validatedData.error.flatten().fieldErrors,
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

