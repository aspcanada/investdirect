import { ClerkProvider } from '@clerk/nextjs'
import '@/app/globals.css'
import { ComingSoonDialogProvider } from '@/components/providers/coming-soon-dialog'

export const metadata = {
  title: 'InvestDirect Community',
  description:
    'Connect with real estate investors and lenders in our trusted community platform.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="flex min-h-screen w-full flex-col">
          <ComingSoonDialogProvider>{children}</ComingSoonDialogProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
