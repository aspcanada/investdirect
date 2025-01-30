'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createDeal } from './actions';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const dealSchema = z.object({
  dealName: z.string().min(3, 'Deal name must be at least 3 characters.'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters.'),
  value: z.coerce.number().min(1, 'Value must be greater than 0.'),
  repairCosts: z.coerce.number().min(0, 'Repair costs cannot be negative.'),
  amountNeeded: z.coerce
    .number()
    .min(1, 'Amount needed must be greater than 0.'),
  interestRate: z.coerce.number().min(0, 'Interest rate cannot be negative.'),
  loanTerm: z.coerce.number().min(1, 'Loan term must be greater than 0.'),
  propertyType: z.string().min(3, 'Property type is required.'),
  address: z.object({
    street: z.string(),
    city: z.string(),
    province: z.string(),
    postalCode: z.string()
  }),
  bedrooms: z.coerce.number().min(0),
  bathrooms: z.coerce.number().min(0),
  year: z.coerce.number().min(1800, 'Invalid year.'),
  buildingSf: z.coerce.number().min(1),
  lotSizeSf: z.coerce.number().min(1)
});

export function AddDealForm() {
  const [message, setMessage] = useState('');

  const form = useForm({
    resolver: async (data, context, options) => {
      const result = await zodResolver(dealSchema)(data, context, options);
      if (result.errors) {
        console.log('Form validation errors:', result.errors);
      }
      return result;
    },

    defaultValues: {
      dealName: '123',
      description: '1234567890',
      value: 123,
      repairCosts: 123,
      amountNeeded: 123,
      interestRate: 123,
      loanTerm: 123,
      propertyType: '123',
      address: {
        street: '123',
        city: '123',
        province: '123',
        postalCode: '123'
      },
      bedrooms: 123,
      bathrooms: 123,
      year: 2023,
      buildingSf: 123,
      lotSizeSf: 123
    }

    // defaultValues: {
    //   dealName: '',
    //   description: '',
    //   value: 0,
    //   repairCosts: 0,
    //   amountNeeded: 0,
    //   interestRate: 0,
    //   loanTerm: 0,
    //   propertyType: '',
    //   address: {
    //     street: '',
    //     city: '',
    //     province: '',
    //     postalCode: ''
    //   },
    //   bedrooms: 0,
    //   bathrooms: 0,
    //   year: 2023,
    //   buildingSf: 0,
    //   lotSizeSf: 0
    // }
  });

  const onSubmit = async (data: any) => {
    const result = await createDeal(data);
    // setMessage(result.message);
    redirect('/deals');
    // revalidatePath('/deals');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded-md">
      <h1 className="text-2xl font-semibold mb-4">Add a New Deal</h1>
      {message && <p className="text-green-600">{message}</p>}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Deal Name */}
          <FormField
            control={form.control}
            name="dealName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deal Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Financials */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="repairCosts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repair Costs</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount Needed */}
            <FormField
              control={form.control}
              name="amountNeeded"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount Needed</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Interest Rate */}
            <FormField
              control={form.control}
              name="interestRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interest Rate</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Loan Term */}
            <FormField
              control={form.control}
              name="loanTerm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Term</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Type</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* bedrooms */}
            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bedrooms</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* bathrooms */}
            <FormField
              control={form.control}
              name="bathrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bathrooms</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* year */}
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* buildingSf */}
            <FormField
              control={form.control}
              name="buildingSf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Building Size</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* lotSizeSf */}
            <FormField
              control={form.control}
              name="lotSizeSf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lot Size</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Address */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="address.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* city should be nested in address */}
            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* province */}
            <FormField
              control={form.control}
              name="address.province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* postalCode */}
            <FormField
              control={form.control}
              name="address.postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
