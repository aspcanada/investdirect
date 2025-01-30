import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ImageIcon, MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { SelectDeal } from 'app/db/schema/deals';
import { DeleteForm } from './delete-form';

export function DealRow({ deal }: { deal: SelectDeal }) {
  // check to see if there is an image
  const hasImage = deal.images.length > 0;

  const imageElement = hasImage ? (
    <Image
      alt="Deal image"
      className="aspect-square rounded-md object-cover"
      height={64}
      src={deal.images[0]}
      width={64}
    />
  ) : (
    <div className="flex h-16 w-16 items-center justify-center rounded-md bg-muted">
      <ImageIcon className="h-8 w-8 text-muted-foreground" />
    </div>
  );

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">{imageElement}</TableCell>
      <TableCell className="font-medium">{deal.dealName}</TableCell>
      <TableCell>{`$${deal.financials.amountNeeded}`}</TableCell>
      <TableCell>{`${deal.financials.interestRate}%`}</TableCell>
      <TableCell>{`${deal.financials.loanTerm} months`}</TableCell>
      <TableCell className="hidden md:table-cell">
        {deal.propertyDetails.address.city}
      </TableCell>
      {/* <TableCell className="hidden md:table-cell">
        {deal.createdAt.toLocaleDateString('en-US')}
      </TableCell> */}
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <DeleteForm dealId={deal.id} userId={deal.userId} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
