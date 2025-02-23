'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { EdgeStoreProvider } from '@/lib/edgestore';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EdgeStoreProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </EdgeStoreProvider>
  );
}
