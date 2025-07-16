import { createCallerFactory } from './trpc'
import { appRouter } from './'
import { createTRPCContext } from './context'

const createCaller = createCallerFactory(appRouter)

export const api = createCaller(await createTRPCContext())