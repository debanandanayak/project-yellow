import { Button } from '../ui/button'
import { auth } from '@/lib/auth'
import { safely } from '@corentinth/chisels'
import { revalidatePath } from 'next/cache'
import { headers } from "next/headers"
export async function SignoutButton() {
    const [session, error] = await safely(auth.api.getSession({ headers: await headers() }))
    if (error || !session) return null
    async function signOut() {
        'use server'
        await auth.api.signOut({ headers: await headers() })
        revalidatePath("/")

    }
    return <form>
        <Button formAction={signOut}>Signout</Button>
    </form>
}