'use client'

import { ChevronDown, Plus } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import { Organization } from '@prisma/client/edge'
import { Skeleton } from '../ui/skeleton'

interface TeamSwitcherProps {
    teams: Organization[]
}
export function WorkspaceSwitcher({
    teams,
}: TeamSwitcherProps) {

    const { data: activeOrganization } = authClient.useActiveOrganization()
    const handleChangeOrganization = async (organizationId: string) => {
        try {
            const { error } = await authClient.organization.setActive({
                organizationId,
            })

            if (error) {
                toast.error("Failed to switch organization")
                return
            }

            toast.success("Organization switched successfully")
        } catch (error) {
            toast.error("Failed to switch organization")
        }
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton className="w-fit px-1.5">
                            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-5 items-center justify-center rounded-md">
                                {/* <activeTeam.logo className="size-3" /> */}
                            </div>
                            <span className="truncate font-medium">{activeOrganization?.name || <div className='flex items-center space-x-4'><Skeleton className="h-3.5 w-[10ch] rounded-md" /></div>}</span>
                            <ChevronDown className="opacity-50" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-60 rounded-sm"
                        align="start"
                        side="bottom"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-muted-foreground text-xs">
                            Teams
                        </DropdownMenuLabel>
                        {teams.map((team, index) => (
                            <Link href={`/d/${team.slug}`} key={team.slug}>
                                <DropdownMenuItem
                                    key={team.name}
                                    onClick={async () => await handleChangeOrganization(team.id)}
                                    className="gap-2"
                                >
                                    <div className="flex items-center justify-center rounded-xs border">
                                        {/* <workspace.logo className="size-4 shrink-0" /> */}
                                    </div>
                                    {team.name}
                                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </Link>
                        ))}
                        <DropdownMenuSeparator />
                        <Link className="text-muted-foreground font-medium"
                            href={'/team/new'}>
                            <DropdownMenuItem className="gap-2">
                                <div className="bg-background flex size-6 items-center justify-center rounded-md border">
                                    <Plus className="size-3" />
                                </div>
                                New team
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu >
    )
}
