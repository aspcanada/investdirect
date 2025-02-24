'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Eye, ImageIcon, Pencil, Trash2 } from 'lucide-react';
import { Deal } from 'app/db/schema/deals';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { useActionState } from 'react';
import { deleteDeal } from '../actions';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

interface DealCardProps {
  deal: Deal;
}

export function DealCard({ deal }: DealCardProps) {
  const [state, deleteDealAction] = useActionState(deleteDeal, { message: '' });
  const hasImage = deal.images.length > 0;

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        {hasImage ? (
          <Image
            alt="Deal image"
            className="object-cover"
            fill
            src={deal.images[0]}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <ImageIcon className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
      </div>
      <CardHeader>
        <div className="space-y-1">
          <Link
            href={`/deals/${deal.id}`}
            className="text-xl font-semibold hover:underline"
          >
            {deal.dealName}
          </Link>
          <p className="text-sm text-muted-foreground">
            {deal.propertyDetails.address.city},{' '}
            {deal.propertyDetails.address.province}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Amount Needed</p>
            <p className="font-medium">
              {formatCurrency(deal.financials.amountNeeded)}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Interest Rate</p>
            <p className="font-medium">{deal.financials.interestRate}%</p>
          </div>
          <div>
            <p className="text-muted-foreground">Term</p>
            <p className="font-medium">{deal.financials.loanTerm} months</p>
          </div>
          <div>
            <p className="text-muted-foreground">Property Type</p>
            <p className="font-medium">{deal.propertyDetails.propertyType}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/deals/${deal.id}`}>
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <Link href={`/deals/${deal.id}/edit`}>
            <Pencil className="h-4 w-4" />
          </Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                deal &quot;{deal.dealName}&quot; and all associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <form action={deleteDealAction}>
                <input type="hidden" name="dealId" value={deal.id} />
                <input type="hidden" name="userId" value={deal.userId} />
                <AlertDialogAction
                  type="submit"
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
