import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";

export async function getProjects(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/projects/', {}, 
        async () => {

        const projects = await prisma.project.findMany()

        if (!projects) {
            throw new Error('No project created')
        }


        return { projects }
    })
}