import { Button } from '../ui/button'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { headers } from "next/headers"
export async function SignoutButton() {
    async function signOut() {
        'use server'
        await auth.api.signOut({ headers: await headers() })
        revalidatePath("/")

    }
    return <form>
        <Button formAction={signOut}>Signout</Button>
    </form>
}