import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../trpc'

export const userRouter = createTRPCRouter({
    getUser: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input }) => {
            // Your database logic here
            return { id: input.id, name: 'John Doe', email: 'john@example.com' }
        }),

    getUsers: publicProcedure
        .query(async () => {
            // Return all users
            return [
                { id: '1', name: 'John Doe', email: 'john@example.com' },
                { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
            ]
        }),

    createUser: publicProcedure
        .input(z.object({
            name: z.string().min(1),
            email: z.string().email()
        }))
        .mutation(async ({ input }) => {
            // Create user logic
            const newUser = { id: crypto.randomUUID(), ...input }
            return newUser
        }),
})