import { safely } from '@corentinth/chisels'
import type { PrismaClientType } from '@/lib/prisma'

export async function isDatabaseHealthy({ prisma }: { prisma: PrismaClientType }) {
    const [result, error] = await safely(prisma.$queryRaw`SELECT 1 as result`)
    console.log(error)
    return error === null
}
