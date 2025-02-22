import Link from 'next/link';

import {
  FolderClosed,
  Home,
  Package,
  PanelLeft,
  Settings,
  Users2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';

import { VercelLogo } from '@/components/icons';

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <SheetTitle>Menu</SheetTitle>
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <VercelLogo className="h-3 w-3 transition-all group-hover:scale-110" />
            <span className="sr-only">Vercel</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-4 px-2.5 text-foreground"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/products"
            className="flex items-center gap-4 px-2.5 text-foreground"
          >
            <Package className="h-5 w-5" />
            Products
          </Link>
          <Link
            href="/deals"
            className="flex items-center gap-4 px-2.5 text-foreground"
          >
            <FolderClosed className="h-5 w-5" />
            Deals
          </Link>
          <Link
            href="/members"
            className="flex items-center gap-4 px-2.5 text-foreground"
          >
            <Users2 className="h-5 w-5" />
            Members
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
