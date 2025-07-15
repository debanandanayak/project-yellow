import { organization } from 'better-auth/plugins'
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [
        organization()
    ]
})
export const { signIn, signOut, signUp, useSession, } = authClient