import { createTRPCRouter } from './trpc'
import { userRouter } from './routers/users.router'
export * from './api'
export const appRouter = createTRPCRouter({
    user: userRouter,
})

export type AppRouter = typeof appRouter
