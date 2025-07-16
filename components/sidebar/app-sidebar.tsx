// "use client"

import { Search } from 'lucide-react'
import type * as React from 'react'

import { NavMain } from './nav-main'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { WorkspaceSwitcher } from './workspace-switcher'
import { Organization } from '@prisma/client/edge'

export type AppSidebarData = {
    user: {
        name: string
        email: string
        avatar: string
    }
    teams: Organization[]
    navMain: {
        title: string
        url: string
        icon: string
        // biome-ignore lint/suspicious/noExplicitAny: <its okay>
        items: any[] // You can further type this if needed
    }[]
}

export function AppSidebar({
    data,
    ...props
}: { data: AppSidebarData } & React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <div className="flex flex-row items-center">
                    <WorkspaceSwitcher teams={data.teams} />
                    <Button variant="ghost" className="hover:text-muted-foreground">
                        <Search />
                    </Button>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter></SidebarFooter>
        </Sidebar>
    )
}
