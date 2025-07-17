import { Button } from '../ui/button'
import { auth } from '@/lib/auth'
import { safely } from '@corentinth/chisels'
import { headers } from "next/headers"
export async function GotoApp() {
    const [session, error] = await safely(auth.api.getSession({ headers: await headers() }))
    if (error) return null
    return <>
        {session?.user ? <Button>Hey {session.user.name}</Button> : <></>}
    </>
}