import { ClerkProvider } from '@clerk/nextjs';
import { EdgeStoreProvider } from '../lib/edgestore';
import './globals.css';

import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Next.js App Router + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="flex min-h-screen w-full flex-col">
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
