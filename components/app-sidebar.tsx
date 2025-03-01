import { Users2, Home, FolderClosed, ChartNoAxesCombined } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Menu items.
  const items = [
    {
      title: 'Dashboard',
      url: '/',
      icon: Home,
    },
    {
      title: 'Deals',
      url: '/deals',
      icon: FolderClosed,
    },
    {
      title: 'Members',
      url: '/members',
      icon: Users2,
    },
    // {
    //   title: 'Search',
    //   url: '#',
    //   icon: Search,
    // },
    // {
    //   title: 'Settings',
    //   url: '#',
    //   icon: Settings,
    // },
  ]

  return (
    <Sidebar collapsible="icon" {...props} variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link
                href="/"
                className="flex items-center gap-2 text-primary text-xl"
              >
                <ChartNoAxesCombined />
                InvestDirect
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
