import prisma from '@/lib/prisma'
import { isDatabaseHealthy } from './health-check.repository'

export async function GET() {
    const isHealthy = await isDatabaseHealthy({ prisma })
    const isEverythingOk = isHealthy
    const status = isEverythingOk ? 'ok' : 'error'
    const statusCode = isEverythingOk ? 200 : 500


    const response = Response.json({
        isDatabaseHealthy: isHealthy,
        isEverythingOk,
        status,
    }, { status: statusCode })

    return response
}