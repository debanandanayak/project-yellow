import { redirect } from 'next/navigation'
import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { getOrganizations } from '@/app/datasource/actions'


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const teams = await getOrganizations()
    if (teams.length === 0) {
        redirect('/team/new')
    }
    const data = {
        user: {
            name: 'shadcn',
            email: 'm@example.com',
            avatar: '/avatars/shadcn.jpg',
        },
        teams,
        navMain: [
            {
                title: 'Playground',
                url: 'play',
                icon: '',
                items: [],
            },
            {
                title: 'Models',
                url: '#',
                icon: '',
                items: [],
            },
            {
                title: 'Documentation',
                url: '#',
                icon: '',
                items: [],
            },
            {
                title: 'Settings',
                url: '#',
                icon: '',
                items: [],
            },
        ],
    }
    return (
        <SidebarProvider>
            <AppSidebar data={data} />
            <SidebarInset className="h-svh p-0 lg:p-1.5">
                <div className="h-full flex flex-col  lg:rounded-sm lg:ring lg:ring-accent">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
