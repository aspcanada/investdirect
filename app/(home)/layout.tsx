import '@/app/globals.css'

import Providers from '../providers'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'

export const metadata = {
  title: 'Dashboard | InvestDirect Community',
  description:
    'Manage your real estate investments and connect with our community.',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SiteHeader />
          <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </Providers>
  )
}
