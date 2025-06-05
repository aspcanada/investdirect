'use client'

import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useComingSoonDialog } from '@/components/providers/coming-soon-dialog'

export function SiteHeader() {
  const { showComingSoon } = useComingSoonDialog()

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        {/* <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        /> */}

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 relative"
            onClick={() => showComingSoon('Alerts')}
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-[6px] top-[5px] h-2 w-2 rounded-full bg-red-500" />
          </Button>
          <UserButton />
        </div>
      </div>
    </header>
  )
}
