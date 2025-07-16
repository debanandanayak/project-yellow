"use server"

import { getCurrentUser } from "./users"
import prisma from '@/lib/prisma'

export async function getOrganizations() {
    const { currentUser } = await getCurrentUser()

    const members = await prisma.member.findMany({
        where: {
            userId: {
                equals: currentUser.id
            }
        }
    })

    const organizations = await prisma.organization.findMany({
        where: {
            id: {
                in: members.map((member) => member.organizationId)
            }
        }
    })

    return organizations
}

export async function getActiveOrganization(userId: string) {
    const memberUser = await prisma.member.findFirst({
        where: {
            id: {
                equals: userId
            }
        }
    })

    if (!memberUser) {
        return null
    }

    const activeOrganization = await prisma.organization.findFirst({
        where: {
            id: memberUser.organizationId
        }
    })

    return activeOrganization
}