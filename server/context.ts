import { type CreateNextContextOptions } from '@trpc/server/adapters/next'
import { headers } from 'next/headers'

export async function createTRPCContext(opts?: CreateNextContextOptions) {
    const headersList = await headers()

    return {
        headers: headersList,
        ...opts,
    }
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>