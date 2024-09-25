import { PrismaClient } from '@prisma/client'
import { PasswordUtils } from '../../utils/password/implementation/password.utils'

const prisma = new PrismaClient()

export { prisma }