'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { EdgeStoreProvider } from '@/lib/edgestore';
import { ClerkProvider } from '@clerk/nextjs';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <EdgeStoreProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </EdgeStoreProvider>
    </ClerkProvider>
  );
}
