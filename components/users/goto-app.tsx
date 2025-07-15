import { Button } from '../ui/button'
import { auth } from '@/lib/auth'
import { headers } from "next/headers"
export async function GotoApp() {
    const session = await auth.api.getSession({ headers: await headers() })
    return <>
        {session?.user ? <Button>Hey {session.user.name}</Button> : <></>}
    </>
}