import { headers } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import { auth } from "./lib/auth"
export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    try {
        const nextHeaders = await headers()
        const userSession = await auth.api.getSession({ headers: nextHeaders })

        if (userSession?.user && pathname === "/d") {
            if (userSession.session.activeOrganizationId) {
                const organizations = await auth.api.getFullOrganization({
                    headers: nextHeaders,
                })
                return NextResponse.redirect(
                    new URL(`/d/${organizations?.slug}/emails`, request.url),
                )
            }
            const organizations = await auth.api.listOrganizations({
                headers: nextHeaders,
            })
            if (organizations.length === 0) {
                return NextResponse.redirect(
                    new URL("/team/new", request.url),
                )
            } else {
                return NextResponse.redirect(
                    new URL(`/d/${organizations[0]?.slug}/emails`, request.url),
                )
            }
        }
    } catch (_error) {
        console.error(_error)

    }
    return NextResponse.next()
}

export const config = {
    matcher: "/d",
}
