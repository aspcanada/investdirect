import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Eye, ImageIcon, Pencil, Trash2 } from 'lucide-react'
import { TableCell, TableRow } from '@/components/ui/table'
import { DealWithUser } from '@/app/db/queries/deals-with-users'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useActionState } from 'react'
import { deleteDeal } from '../actions'

export function DealRow({ deal }: { deal: DealWithUser }) {
  const [state, deleteDealAction] = useActionState(deleteDeal, { message: '' })

  // check to see if there is an image
  const hasImage = deal.images.length > 0

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
  )

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">{imageElement}</TableCell>
      <TableCell>
        <Link href={`/deals/${deal.dealId}`}>{deal.dealName}</Link>
      </TableCell>
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
        {/* add view/edit/delete buttons instead of dropdown */}
        <div className="flex gap-2">
          <Link href={`/deals/${deal.dealId}`}>
            <Button variant="outline" size="icon">
              <Eye />
            </Button>
          </Link>
          <Link href={`/deals/${deal.dealId}/edit`}>
            <Button variant="outline" size="icon">
              <Pencil />
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon">
                <Trash2 />
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
                  <input type="hidden" name="dealId" value={deal.dealId} />
                  <input type="hidden" name="userId" value={deal.user.id} />
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
        </div>
      </TableCell>
    </TableRow>
  )
}
