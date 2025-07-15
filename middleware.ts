import { type NextRequest, NextResponse } from "next/server"
import { auth } from './lib/auth'
import { headers } from 'next/headers'
export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    try {
        const nextHeaders = await headers()
        const session = await auth.api.getSession({ headers: nextHeaders })

        if (session?.user && pathname === "/d") {
            const organizations = await auth.api.listOrganizations({ headers: nextHeaders })
            if (organizations.length === 0) {
                const defaultOrganization = await auth.api.createOrganization({
                    headers: nextHeaders,
                    body: {
                        name: '',
                        slug: `org_${session.user.email.split("@")[0]}`,
                        userId: session.user.id,
                        metadata: undefined,
                        logo: undefined,
                    }
                })
                return NextResponse.redirect(new URL(`/d/${defaultOrganization?.slug}`, request.url))
            } else {
                const organizations = await auth.api.getFullOrganization({ headers: nextHeaders, })
                return NextResponse.redirect(new URL(`/d/${organizations?.slug}`, request.url))

            }

        }
    } catch (_error) {

    }
    return NextResponse.next()


}

export const config = {
    matcher: "/d",
}
