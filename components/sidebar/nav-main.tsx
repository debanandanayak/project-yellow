'use client'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import { navMain } from './menu-items'

export function NavMain() {
    const { slug } = useParams()
    const path = usePathname()
    console.log(path)

    return (
        <SidebarGroup>
            <SidebarMenu>
                {navMain.map((item) => (
                    <SidebarMenuButton
                        key={item.title}
                        asChild
                        isActive={path === `/d/${slug}${item.url}` ||
                            path === `/d/${slug}${item.url}/`}
                    >
                        <Link href={`/d/${slug}${item.url}`}>
                            {item.title}
                        </Link>
                    </SidebarMenuButton>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
