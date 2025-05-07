'use client';

import { useActionState, useState } from 'react';
import { upsertDeal } from '../actions';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useEdgeStore } from '@/lib/edgestore';
import {
  MultiFileDropzone,
  type FileState
} from '@/components/upload/multi-file';
import { Deal } from '@/app/db/schema/deals';

interface DealFormProps {
  mode: 'add' | 'edit';
  deal?: Deal;
}
export function DealForm({ mode, deal }: DealFormProps) {
  const [state, action, isPending] = useActionState(upsertDeal, null);

  return (
    <>
      <div className="max-w-2xl mx-auto mt-10 p-6">
        {/* <h1 className="text-2xl font-semibold mb-4">Add a New Deal</h1> */}

        <form action={action} autoComplete="on">
          {mode === 'edit' && (
            <input type="hidden" name="id" value={deal?.id} />
          )}

          <div className="space-y-4">
            {/* Deal Name */}
            <div className="space-y-2">
              <Label htmlFor="dealName">Deal Name</Label>
              <Input
                id="dealName"
                name="dealName"
                defaultValue={
                  mode === 'edit' ? deal?.dealName : state?.inputs?.dealName
                }
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
                defaultValue={
                  mode === 'edit'
                    ? deal?.description
                    : state?.inputs?.description
                }
                placeholder="Description"
                required
                minLength={5}
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
            <Card className="my-5 w-full mx-auto">
              <CardHeader>
                <CardTitle>Financials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      {/* value */}
                      <Label htmlFor="value">Value</Label>
                      <Input
                        id="value"
                        name="value"
                        defaultValue={
                          mode === 'edit'
                            ? deal?.financials?.value
                            : state?.inputs?.financials?.value
                        }
                        type="number"
                        placeholder="500000"
                        required
                        minLength={1}
                        maxLength={100}
                        autoComplete="value"
                        aria-describedby="value-error"
                        className={
                          state?.errors?.['financials.value']
                            ? 'border-red-500'
                            : ''
                        }
                      />
                      {state?.errors?.['financials.value'] && (
                        <p id="value-error" className="text-sm text-red-500">
                          {state.errors['financials.value'][0]}
                        </p>
                      )}
                    </div>

                    {/* repairCosts */}
                    <div className="space-y-2">
                      <Label htmlFor="repairCosts">Repair Costs</Label>
                      <Input
                        id="repairCosts"
                        name="repairCosts"
                        defaultValue={
                          mode === 'edit'
                            ? deal?.financials?.repairCosts
                            : state?.inputs?.financials?.repairCosts
                        }
                        type="number"
                        placeholder="50000"
                        // required
                        minLength={1}
                        maxLength={100}
                        autoComplete="repairCosts"
                        aria-describedby="repairCosts-error"
                        className={
                          state?.errors?.['financials.repairCosts']
                            ? 'border-red-500'
                            : ''
                        }
                      />
                      {state?.errors?.['financials.repairCosts'] && (
                        <p
                          id="repairCosts-error"
                          className="text-sm text-red-500"
                        >
                          {state.errors['financials.repairCosts'][0]}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {/* Amount Needed */}
                    <div className="space-y-2">
                      <Label htmlFor="amountNeeded">Amount Needed</Label>
                      <Input
                        id="amountNeeded"
                        name="amountNeeded"
                        defaultValue={
                          mode === 'edit'
                            ? deal?.financials?.amountNeeded
                            : state?.inputs?.financials?.amountNeeded
                        }
                        type="number"
                        placeholder="100000"
                        required
                        minLength={1}
                        maxLength={100}
                        autoComplete="amountNeeded"
                        aria-describedby="amountNeeded-error"
                        className={
                          state?.errors?.['financials.amountNeeded']
                            ? 'border-red-500'
                            : ''
                        }
                      />
                      {state?.errors?.['financials.amountNeeded'] && (
                        <p
                          id="amountNeeded-error"
                          className="text-sm text-red-500"
                        >
                          {state.errors['financials.amountNeeded'][0]}
                        </p>
                      )}
                    </div>

                    {/* Interest Rate */}
                    <div className="space-y-2">
                      <Label htmlFor="interestRate">Interest Rate</Label>
                      <Input
                        id="interestRate"
                        name="interestRate"
                        defaultValue={
                          mode === 'edit'
                            ? deal?.financials?.interestRate
                            : state?.inputs?.financials?.interestRate
                        }
                        type="number"
                        placeholder="10%"
                        required
                        minLength={1}
                        maxLength={100}
                        autoComplete="interestRate"
                        aria-describedby="interestRate-error"
                        className={
                          state?.errors?.['financials.interestRate']
                            ? 'border-red-500'
                            : ''
                        }
                      />
                      {state?.errors?.['financials.interestRate'] && (
                        <p
                          id="interestRate-error"
                          className="text-sm text-red-500"
                        >
                          {state.errors['financials.interestRate'][0]}
                        </p>
                      )}
                    </div>

                    {/* Loan Term */}
                    <div className="space-y-2">
                      <Label htmlFor="loanTerm">Loan Term (Months)</Label>
                      <Input
                        id="loanTerm"
                        name="loanTerm"
                        defaultValue={
                          mode === 'edit'
                            ? deal?.financials?.loanTerm
                            : state?.inputs?.financials?.loanTerm
                        }
                        type="number"
                        placeholder="12"
                        required
                        minLength={5}
                        maxLength={100}
                        autoComplete="loanTerm"
                        aria-describedby="loanTerm-error"
                        className={
                          state?.errors?.['financials.loanTerm']
                            ? 'border-red-500'
                            : ''
                        }
                      />
                      {state?.errors?.['financials.loanTerm'] && (
                        <p id="loanTerm-error" className="text-sm text-red-500">
                          {state.errors['financials.loanTerm'][0]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Property Details */}
          <Card className="my-5 w-full mx-auto">
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    {/* propertyType */}
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Input
                      id="propertyType"
                      name="propertyType"
                      defaultValue={
                        mode === 'edit'
                          ? deal?.propertyDetails?.propertyType
                          : state?.inputs?.propertyDetails?.propertyType
                      }
                      placeholder="Single Family Dwelling"
                      // required
                      // minLength={5}
                      // maxLength={100}
                      autoComplete="propertyType"
                      aria-describedby="propertyType-error"
                      className={
                        state?.errors?.['propertyDetails.propertyType']
                          ? 'border-red-500'
                          : ''
                      }
                    />
                  </div>

                  {/* year */}
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      name="year"
                      defaultValue={
                        mode === 'edit'
                          ? deal?.propertyDetails?.year
                          : state?.inputs?.propertyDetails?.year
                      }
                      type="number"
                      placeholder="2008"
                      required
                      minLength={4}
                      maxLength={4}
                      autoComplete="year"
                      className={
                        state?.errors?.['propertyDetails.year']
                          ? 'border-red-500'
                          : ''
                      }
                    />
                    {state?.errors?.['propertyDetails.year'] && (
                      <p id="year-error" className="text-sm text-red-500">
                        {state.errors['propertyDetails.year'][0]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* bedrooms */}
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      name="bedrooms"
                      defaultValue={
                        mode === 'edit'
                          ? deal?.propertyDetails?.bedrooms
                          : state?.inputs?.propertyDetails?.bedrooms
                      }
                      type="number"
                      placeholder="3"
                      // required
                      // minLength={5}
                      // maxLength={100}
                      autoComplete="bedrooms"
                    />
                  </div>

                  {/* bathrooms */}
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      name="bathrooms"
                      defaultValue={
                        mode === 'edit'
                          ? deal?.propertyDetails?.bathrooms
                          : state?.inputs?.propertyDetails?.bathrooms
                      }
                      type="number"
                      placeholder="2"
                      // required
                      // minLength={5}
                      // maxLength={100}
                      autoComplete="bathrooms"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* buildingSf */}
                  <div className="space-y-2">
                    <Label htmlFor="buildingSf">Building Size (sqft)</Label>
                    <Input
                      id="buildingSf"
                      name="buildingSf"
                      defaultValue={
                        mode === 'edit'
                          ? deal?.propertyDetails?.buildingSf
                          : state?.inputs?.propertyDetails?.buildingSf
                      }
                      type="number"
                      placeholder="2000"
                      // required
                      // minLength={5}
                      // maxLength={100}
                      autoComplete="buildingSf"
                      className={
                        state?.errors?.['propertyDetails.buildingSf']
                          ? 'border-red-500'
                          : ''
                      }
                    />
                    {state?.errors?.['propertyDetails.buildingSf'] && (
                      <p id="buildingSf-error" className="text-sm text-red-500">
                        {state.errors['propertyDetails.buildingSf'][0]}
                      </p>
                    )}
                  </div>

                  {/* lotSizeSf */}
                  <div className="space-y-2">
                    <Label htmlFor="lotSizeSf">Lot Size (sqft)</Label>
                    <Input
                      id="lotSizeSf"
                      name="lotSizeSf"
                      defaultValue={
                        mode === 'edit'
                          ? deal?.propertyDetails?.lotSizeSf
                          : state?.inputs?.propertyDetails?.lotSizeSf
                      }
                      type="number"
                      placeholder="10000"
                      // required
                      // minLength={1}
                      // maxLength={100}
                      autoComplete="lotSizeSf"
                      className={
                        state?.errors?.['propertyDetails.lotSizeSf']
                          ? 'border-red-500'
                          : ''
                      }
                    />
                    {state?.errors?.['propertyDetails.lotSizeSf'] && (
                      <p id="lotSizeSf-error" className="text-sm text-red-500">
                        {state.errors['propertyDetails.lotSizeSf'][0]}
                      </p>
                    )}
                  </div>
                </div>
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
                      mode === 'edit'
                        ? deal?.propertyDetails?.address?.street
                        : state?.inputs?.propertyDetails?.address?.street
                    }
                    placeholder="123 Main St"
                    // required
                    minLength={5}
                    maxLength={100}
                    autoComplete="street"
                    aria-describedby="street-error"
                    className={
                      state?.errors?.['propertyDetails.address.street']
                        ? 'border-red-500'
                        : ''
                    }
                  />
                  {state?.errors?.['propertyDetails.address.street'] && (
                    <p id="street-error" className="text-sm text-red-500">
                      {state.errors['propertyDetails.address.street'][0]}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      defaultValue={
                        mode === 'edit'
                          ? deal?.propertyDetails?.address?.city
                          : state?.inputs?.propertyDetails?.address?.city
                      }
                      placeholder="Toronto"
                      required
                      minLength={2}
                      maxLength={50}
                      autoComplete="city"
                      aria-describedby="city-error"
                      className={
                        state?.errors?.['propertyDetails.address.city']
                          ? 'border-red-500'
                          : ''
                      }
                    />
                    {state?.errors?.['propertyDetails.address.city'] && (
                      <p id="city-error" className="text-sm text-red-500">
                        {state.errors['propertyDetails.address.city'][0]}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="province">Province</Label>
                    <Input
                      id="province"
                      name="province"
                      defaultValue={
                        mode === 'edit'
                          ? deal?.propertyDetails?.address?.province
                          : state?.inputs?.propertyDetails?.address?.province
                      }
                      placeholder="ON"
                      required
                      minLength={2}
                      maxLength={50}
                      autoComplete="province"
                      aria-describedby="province-error"
                      className={
                        state?.errors?.['propertyDetails.address.province']
                          ? 'border-red-500'
                          : ''
                      }
                    />
                    {state?.errors?.['propertyDetails.address.province'] && (
                      <p id="province-error" className="text-sm text-red-500">
                        {state.errors['propertyDetails.address.province'][0]}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      defaultValue={
                        mode === 'edit'
                          ? deal?.propertyDetails?.address?.postalCode
                          : state?.inputs?.propertyDetails?.address?.postalCode
                      }
                      placeholder="M5H 2N2"
                      required
                      pattern="[A-Za-z][0-9][A-Za-z][ -]?[0-9][A-Za-z][0-9]"
                      minLength={6}
                      maxLength={7}
                      autoComplete="postal-code"
                      aria-describedby="postalCode-error"
                      className={
                        state?.errors?.['propertyDetails.address.postalCode']
                          ? 'border-red-500'
                          : ''
                      }
                    />
                    {state?.errors?.['propertyDetails.address.postalCode'] && (
                      <p id="postalCode-error" className="text-sm text-red-500">
                        {state.errors['propertyDetails.address.postalCode'][0]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Images */}
          <Card className="my-5 w-full mx-auto">
            <CardHeader>
              <CardTitle>Property Images</CardTitle>
              <p className="text-sm text-gray-500">
                You can upload up to 3 images for your deal.
              </p>
            </CardHeader>
            <CardContent>
              <MultiImageExample
                existingImages={mode === 'edit' ? deal?.images : undefined}
              />
            </CardContent>
          </Card>

          {state?.message && (
            <Alert variant={state.success ? 'default' : 'destructive'}>
              {state.success && <CheckCircle2 className="h-4 w-4" />}
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          <div className="mt-5">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Saving...' : 'Save Deal'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

function MultiImageExample({ existingImages }: { existingImages?: string[] }) {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>(
    existingImages || []
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const { edgestore } = useEdgeStore();

  function updateFileProgress(key: string, progress: FileState['progress']) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  const handleDelete = async (urlToDelete: string) => {
    try {
      // setIsDeleting(true);
      await edgestore.publicFiles.delete({
        url: urlToDelete
      });
      setExistingImageUrls((prev) => prev.filter((url) => url !== urlToDelete));
    } catch (error) {
      console.error('Error deleting image:', error);
    } finally {
      // setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      {existingImageUrls.map((url) => (
        <div key={url} className="relative">
          <img
            src={url}
            alt="Uploaded property"
            className="w-full h-48 object-cover rounded-lg"
          />
          <Button
            variant={'destructive'}
            size="icon"
            type="button"
            onClick={() => handleDelete(url)}
            // disabled={isDeleting}
            className="absolute top-2 right-2"
          >
            {/* {isDeleting ? (
              <span className="loading">...</span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )} */}
            {/* lucide icon */}
            <Trash2 />
          </Button>
        </div>
      ))}

      <MultiFileDropzone
        value={fileStates}
        dropzoneOptions={{
          maxFiles: 3,
          maxSize: 1024 * 1024 * 2
        }}
        disabled={existingImageUrls.length >= 3}
        onChange={setFileStates}
        onFilesAdded={async (addedFiles) => {
          setFileStates([...fileStates, ...addedFiles]);
          await Promise.all(
            addedFiles.map(async (addedFileState) => {
              try {
                const res = await edgestore.publicFiles.upload({
                  file: addedFileState.file as File,
                  onProgressChange: async (progress) => {
                    updateFileProgress(addedFileState.key, progress);
                    if (progress === 100) {
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      updateFileProgress(addedFileState.key, 'COMPLETE');
                    }
                  }
                });
                setExistingImageUrls((prev) => [...prev, res.url]);
                // Remove the completed upload from fileStates
                setFileStates((prev) =>
                  prev.filter((state) => state.key !== addedFileState.key)
                );
              } catch (err) {
                updateFileProgress(addedFileState.key, 'ERROR');
              }
            })
          );
        }}
      />

      <input
        type="hidden"
        name="images"
        value={JSON.stringify(existingImageUrls)}
      />
    </div>
  );
}
