'use client';

import { useActionState } from 'react';
import { ActionResponse, createDeal } from './actions';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const initialState: ActionResponse = {
  success: false,
  message: ''
};

export function AddDealForm() {
  const [state, action, isPending] = useActionState(createDeal, initialState);

  return (
    <>
      <div className="max-w-2xl mx-auto mt-10 p-6">
        {/* <h1 className="text-2xl font-semibold mb-4">Add a New Deal</h1> */}

        <form action={action} autoComplete="on">
          <div className="space-y-4">
            {/* Deal Name */}
            <div className="space-y-2">
              <Label htmlFor="dealName">Deal Name</Label>
              <Input
                id="dealName"
                name="dealName"
                defaultValue={state?.inputs?.dealName}
                placeholder="Deal Name"
                required
                minLength={5}
                maxLength={100}
                autoComplete="dealName"
                aria-describedby="dealName-error"
                className={state?.errors?.dealName ? 'border-red-500' : ''}
              />
              {state?.errors?.dealName && (
                <p id="dealName-error" className="text-sm text-red-500">
                  {state.errors.dealName[0]}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={state?.inputs?.description}
                placeholder="Description"
                required
                minLength={5}
                maxLength={1000}
                autoComplete="description"
                aria-describedby="description-error"
                className={state?.errors?.description ? 'border-red-500' : ''}
              />
              {state?.errors?.description && (
                <p id="description-error" className="text-sm text-red-500">
                  {state.errors.description[0]}
                </p>
              )}
            </div>

            {/* Financials */}
            <div className="space-y-2">
              {/* value */}
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                name="value"
                defaultValue={state?.inputs?.financials?.value}
                type="number"
                placeholder="0"
                required
                minLength={5}
                maxLength={100}
                autoComplete="value"
                aria-describedby="value-error"
                // className={state?.errors?.financials?.value ? 'border-red-500' : ''}
              />
            </div>

            {/* repairCosts */}
            <div className="space-y-2">
              <Label htmlFor="repairCosts">Repair Costs</Label>
              <Input
                id="repairCosts"
                name="repairCosts"
                defaultValue={state?.inputs?.financials?.repairCosts}
                type="number"
                placeholder="0"
                required
                minLength={5}
                maxLength={100}
                autoComplete="repairCosts"
                aria-describedby="repairCosts-error"
                // className={state?.errors?.financials?.repairCosts ? 'border-red-500' : ''}
              />
            </div>

            {/* Amount Needed */}
            <div className="space-y-2">
              <Label htmlFor="amountNeeded">Amount Needed</Label>
              <Input
                id="amountNeeded"
                name="amountNeeded"
                defaultValue={state?.inputs?.financials?.amountNeeded}
                type="number"
                placeholder="0"
                required
                minLength={5}
                maxLength={100}
                autoComplete="amountNeeded"
                aria-describedby="amountNeeded-error"
                // className={state?.errors?.financials?.amountNeeded ? 'border-red-500' : ''}
              />
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <Label htmlFor="interestRate">Interest Rate</Label>
              <Input
                id="interestRate"
                name="interestRate"
                defaultValue={state?.inputs?.financials?.interestRate}
                type="number"
                placeholder="0"
                required
                minLength={5}
                maxLength={100}
                autoComplete="interestRate"
                aria-describedby="interestRate-error"
                // className={state?.errors?.financials?.interestRate ? 'border-red-500' : ''}
              />
            </div>

            {/* Loan Term */}
            <div className="space-y-2">
              <Label htmlFor="loanTerm">Loan Term</Label>
              <Input
                id="loanTerm"
                name="loanTerm"
                defaultValue={state?.inputs?.financials?.loanTerm}
                type="number"
                placeholder="0"
                required
                minLength={5}
                maxLength={100}
                autoComplete="loanTerm"
                aria-describedby="loanTerm-error"
                // className={state?.errors?.financials?.loanTerm ? 'border-red-500' : ''}
              />
            </div>
          </div>

          {/* new card */}
          <Card className="my-5 w-full mx-auto">
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Property Details */}
              <div className="space-y-2">
                {/* propertyType */}
                <Label htmlFor="propertyType">Property Type</Label>
                <Input
                  id="propertyType"
                  name="propertyType"
                  defaultValue={state?.inputs?.propertyDetails?.propertyType}
                  placeholder="Property Type"
                  required
                  minLength={5}
                  maxLength={100}
                  autoComplete="propertyType"
                  aria-describedby="propertyType-error"
                  // className={state?.errors?.propertyDetails?.propertyType ? 'border-red-500' : ''}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* bedrooms */}
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    name="bedrooms"
                    defaultValue={state?.inputs?.propertyDetails?.bedrooms}
                    type="number"
                    placeholder="0"
                    required
                    minLength={5}
                    maxLength={100}
                    autoComplete="bedrooms"
                  />
                </div>

                {/* bathrooms */}
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    name="bathrooms"
                    defaultValue={state?.inputs?.propertyDetails?.bathrooms}
                    type="number"
                    placeholder="0"
                    required
                    minLength={5}
                    maxLength={100}
                    autoComplete="bathrooms"
                  />
                </div>
              </div>

              {/* year */}
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  name="year"
                  defaultValue={state?.inputs?.propertyDetails?.year}
                  type="number"
                  placeholder="YYYY"
                  required
                  minLength={4}
                  maxLength={4}
                  autoComplete="year"
                />

                {/* buildingSf */}
                <Label htmlFor="buildingSf">Building Size</Label>
                <Input
                  id="buildingSf"
                  name="buildingSf"
                  defaultValue={state?.inputs?.propertyDetails?.buildingSf}
                  type="number"
                  placeholder="0"
                  required
                  minLength={5}
                  maxLength={100}
                  autoComplete="buildingSf"
                />

                {/* lotSizeSf */}
                <Label htmlFor="lotSizeSf">Lot Size</Label>
                <Input
                  id="lotSizeSf"
                  name="lotSizeSf"
                  defaultValue={state?.inputs?.propertyDetails?.lotSizeSf}
                  type="number"
                  placeholder="0"
                  required
                  minLength={5}
                  maxLength={100}
                  autoComplete="lotSizeSf"
                />
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card className="my-5 w-full mx-auto">
            <CardHeader>
              <CardTitle>Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="street">Street</Label>
                  <Input
                    id="street"
                    name="street"
                    defaultValue={
                      state?.inputs?.propertyDetails?.address?.street
                    }
                    placeholder="123 Main St"
                    required
                    minLength={5}
                    maxLength={100}
                    autoComplete="street"
                    aria-describedby="street-error"
                    // className={state?.errors?.street ? 'border-red-500' : ''}
                  />
                  {/* {state?.errors?.street && (
              <p id="street-error" className="text-sm text-red-500">
                {state.errors.street[0]}
              </p>
            )} */}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      defaultValue={
                        state?.inputs?.propertyDetails?.address?.city
                      }
                      placeholder="Toronto"
                      required
                      minLength={2}
                      maxLength={50}
                      autoComplete="city"
                      aria-describedby="city-error"
                      // className={state?.errors?.city ? 'border-red-500' : ''}
                    />
                    {/* {state?.errors?.city && (
                <p id="city-error" className="text-sm text-red-500">
                  {state.errors.city[0]}
                </p>
              )} */}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="province">Province</Label>
                    <Input
                      id="province"
                      name="province"
                      defaultValue={
                        state?.inputs?.propertyDetails?.address?.province
                      }
                      placeholder="ON"
                      required
                      minLength={2}
                      maxLength={50}
                      autoComplete="province"
                      aria-describedby="province-error"
                      // className={state?.errors?.province ? 'border-red-500' : ''}
                    />
                    {/* {state?.errors?.province && (
                <p id="province-error" className="text-sm text-red-500">
                  {state.errors.province[0]}
                </p>
              )} */}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      defaultValue={
                        state?.inputs?.propertyDetails?.address?.postalCode
                      }
                      placeholder="M5H 2N2"
                      required
                      pattern="[A-Za-z][0-9][A-Za-z][ -]?[0-9][A-Za-z][0-9]"
                      maxLength={10}
                      autoComplete="postal-code"
                      aria-describedby="postalCode-error"
                      // className={state?.errors?.postalCode ? 'border-red-500' : ''}
                    />
                    {/* {state?.errors?.postalCode && (
                <p id="postalCode-error" className="text-sm text-red-500">
                  {state.errors.postalCode[0]}
                </p>
              )} */}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {state?.message && (
            <Alert variant={state.success ? 'default' : 'destructive'}>
              {state.success && <CheckCircle2 className="h-4 w-4" />}
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Saving...' : 'Save Deal'}
          </Button>
        </form>
      </div>
    </>
  );
}
