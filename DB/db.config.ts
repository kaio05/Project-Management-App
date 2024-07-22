import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({
    log: ["query"],
})

export default prisma
// use `prisma` in your application to read and write data in your DB